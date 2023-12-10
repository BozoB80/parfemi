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
      return new NextResponse("Tekst morate unijeti", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Sliku morate unijeti", { status: 400 });
    }

    const baner = await prismadb.baner.create({
      data: {
        label,
        imageUrl,
      }
    });
  
    return NextResponse.json(baner);
  } catch (error) {
    console.log('[BANERS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};




export async function GET(req: Request) {
  try {
    const baner = await prismadb.baner.findMany();
  
    return NextResponse.json(baner);
  } catch (error) {
    console.log('[BANERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};