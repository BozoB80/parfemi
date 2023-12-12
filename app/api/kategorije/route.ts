import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Morate se prijaviti", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Naziv morate unijeti", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Sliku morate unijeti", { status: 400 });
    }

    const kategorija = await prismadb.category.create({
      data: {
        label,
        imageUrl
      }
    });
  
    return NextResponse.json(kategorija);
  } catch (error) {
    console.log('[KATEGORIJa_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};




export async function GET(req: Request) {
  try {
    const kategorija = await prismadb.category.findMany();
  
    return NextResponse.json(kategorija);
  } catch (error) {
    console.log('[KATEGORIJA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};