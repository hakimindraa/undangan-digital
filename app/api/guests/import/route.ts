import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Papa from "papaparse";
import * as XLSX from "xlsx";

function generateSlug(name: string): string {
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return baseSlug || "guest";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    let data: any[] = [];

    if (file.name.endsWith(".csv")) {
      const text = new TextDecoder().decode(buffer);
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });
      data = result.data;
    } else if (file.name.endsWith(".xlsx")) {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(sheet);
    } else {
      return NextResponse.json({ error: "Unsupported file format. Please upload .csv or .xlsx" }, { status: 400 });
    }

    const validGuests = data
      .filter((row: any) => row.name && String(row.name).trim() !== "")
      .map((row: any) => ({
        name: String(row.name).trim(),
        phone: row.phone ? String(row.phone).trim() : null,
      }));

    let importedCount = 0;
    const failedGuests = [];

    // Due to the need for unique slugs and possible duplicates, we do it iteratively
    // or generate unique slugs beforehand.
    for (const guest of validGuests) {
      let slug = generateSlug(guest.name);
      
      // Ensure uniqueness
      let existing = await prisma.guest.findUnique({ where: { slug } });
      let counter = 1;
      while (existing) {
        const newSlug = `${slug}-${counter}`;
        existing = await prisma.guest.findUnique({ where: { slug: newSlug } });
        if (!existing) {
          slug = newSlug;
        }
        counter++;
      }

      try {
        await prisma.guest.create({
          data: {
            name: guest.name,
            phone: guest.phone,
            slug,
          },
        });
        importedCount++;
      } catch (err) {
        failedGuests.push(guest.name);
      }
    }

    return NextResponse.json({
      success: true,
      importedCount,
      failedGuests,
    });
  } catch (error) {
    console.error("Error importing guests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
