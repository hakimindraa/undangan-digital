import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { slug, name, attending, totalGuest, message } = data;

    if (!name) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }

    let guestId = null;

    if (slug) {
      const guest = await prisma.guest.findUnique({ where: { slug } });
      if (guest) {
        guestId = guest.id;
      }
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        guestId,
        name,
        attending,
        totalGuest: attending ? totalGuest : 0,
        message,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: 'desc' },
      include: { guest: true },
    });
    return NextResponse.json(rsvps);
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
