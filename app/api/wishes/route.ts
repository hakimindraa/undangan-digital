import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, message } = data;

    if (!name || !message) {
      return NextResponse.json({ error: "Nama dan pesan wajib diisi" }, { status: 400 });
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
      },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
