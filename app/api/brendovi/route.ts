import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, logo, description } = body;

    if (!userId) {
      return new NextResponse("Morate se prijaviti", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Tekst morate unijeti", { status: 400 });
    }

    if (!logo) {
      return new NextResponse("Logo morate unijeti", { status: 400 });
    }

    const brend = await prismadb.brand.create({
      data: {
        label,
        logo,
        description
      }
    });
  
    return NextResponse.json(brend);
  } catch (error) {
    console.log('[BREND_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};




export async function GET(req: Request) {
  try {
    const brend = await prismadb.brand.findMany();
  
    return NextResponse.json(brend);
  } catch (error) {
    console.log('[BREND_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};