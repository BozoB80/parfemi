import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { banerId: string }}
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { label, imageUrl } = body

    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if (!label) {
      return new NextResponse("Morate unijeti naziv", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Unesite sliku", { status: 400 })
    }

    if(!params.banerId) {
      return new NextResponse("Baner ID je potreban", {status: 400})
    }

    const baner = await prismadb.baner.updateMany({
      where: {
        id: params.banerId,
      },
      data: {
        label,
        imageUrl
      }
    })

    return NextResponse.json(baner)

  } catch (error) {
    console.log('[BANER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function DELETE (
  req: Request,
  { params }: { params: { banerId: string }}
) {
  try {
    const { userId } = auth()
    
    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if(!params.banerId) {
      return new NextResponse("Baner ID je potreban", {status: 400})
    }

    const baner = await prismadb.baner.deleteMany({
      where: {
        id: params.banerId,
      }
    })

    return NextResponse.json(baner)

  } catch (error) {
    console.log('[BANER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET (
  req: Request,
  { params }: { params: { banerId: string }}
) {
  try {
    if(!params.banerId) {
      return new NextResponse("Baner ID je potreban", {status: 400})
    }

    const baner = await prismadb.baner.findUnique({
      where: {
        id: params.banerId,
      }
    })

    return NextResponse.json(baner)

  } catch (error) {
    console.log('[BANER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}