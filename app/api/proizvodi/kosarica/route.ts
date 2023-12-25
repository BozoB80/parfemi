import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json();

    const { name, phone, address, town, postal, payment, title } = body

    console.log(title);

    return NextResponse.json(body)
    

  } catch (error) {
    console.log("[KOŠARICA_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}