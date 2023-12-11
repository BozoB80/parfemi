import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { brendId: string }}
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { label, logo, description } = body

    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if (!label) {
      return new NextResponse("Morate unijeti naziv", { status: 400 })
    }

    if (!logo) {
      return new NextResponse("Unesite sliku", { status: 400 })
    }

    if(!params.brendId) {
      return new NextResponse("Baner ID je potreban", {status: 400})
    }

    const brend = await prismadb.brand.updateMany({
      where: {
        id: params.brendId,
      },
      data: {
        label,
        logo,
        description
      }
    })

    return NextResponse.json(brend)

  } catch (error) {
    console.log('[BREND_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function DELETE (
  req: Request,
  { params }: { params: { brendId: string }}
) {
  try {
    const { userId } = auth()
    
    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if(!params.brendId) {
      return new NextResponse("Brend ID je potreban", {status: 400})
    }

    const brend = await prismadb.brand.deleteMany({
      where: {
        id: params.brendId,
      }
    })

    return NextResponse.json(brend)

  } catch (error) {
    console.log('[BREND_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET (
  req: Request,
  { params }: { params: { brendId: string }}
) {
  try {
    if(!params.brendId) {
      return new NextResponse("Brend ID je potreban", {status: 400})
    }

    const brend = await prismadb.brand.findUnique({
      where: {
        id: params.brendId,
      }
    })

    return NextResponse.json(brend)

  } catch (error) {
    console.log('[BREND_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}