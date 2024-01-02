import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { isWishlisted, productId } = body

    if (!userId) {
      return new NextResponse("Niste prijavljeni", { status: 403 });
    }

    const wishlist = await prismadb.wishlist.create({
      data: {
        isWishlisted,
        userId,
        productId,             
      }
    })

    return NextResponse.json(wishlist)
    
  } catch (error) {
    console.log('[WISHLIST_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request
) {
  try {
    
    const wishlists = await prismadb.wishlist.findMany();
  
    return NextResponse.json(wishlists);
  } catch (error) {
    console.log('[WISHLISTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};