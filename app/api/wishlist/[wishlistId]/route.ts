import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE (
  req: Request,
  { params }: { params: { wishlistId: string }}
) {
  try {
    const { userId } = auth()
    
    if(!userId) {
      return new NextResponse("Niste prijavljeni", {status: 401})
    }

    if(!params.wishlistId) {
      return new NextResponse("Wishlist ID je potreban", {status: 400})
    }

    const wishlist = await prismadb.wishlist.deleteMany({
      where: {
        userId: userId,
        productId: params.wishlistId
      }
    })

    return NextResponse.json(wishlist)

  } catch (error) {
    console.log('[WISHLIST_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET (
  req: Request,
  { params }: { params: { wishlistId: string }}
) {
  try {
    if(!params.wishlistId) {
      return new NextResponse("Wishlist ID je potreban", {status: 400})
    } 

    const wishlist = await prismadb.wishlist.findUnique({
      where: {
        id: params.wishlistId,
      },
      include: {
        product: true
      }
    })

    return NextResponse.json(wishlist)

  } catch (error) {
    console.log('[WISHLIST_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}