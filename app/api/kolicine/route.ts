import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, value } = body;

    if (!userId) {
      return new NextResponse("Morate se prijaviti", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Naziv morate unijeti", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Vrijednost morate unijeti", { status: 400 });
    }

    const kolicina = await prismadb.size.create({
      data: {
        label,
        value
      }
    });
  
    return NextResponse.json(kolicina);
  } catch (error) {
    console.log('[Kolicina_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};




export async function GET(req: Request) {
  try {
    const kolicina = await prismadb.size.findMany();
  
    return NextResponse.json(kolicina);
  } catch (error) {
    console.log('[KOLICINA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};