import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { kategorijaId: string }}
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

    if(!params.kategorijaId) {
      return new NextResponse("Kategorija ID je potreban", {status: 400})
    }

    const kategorija = await prismadb.category.updateMany({
      where: {
        id: params.kategorijaId,
      },
      data: {
        label,
        imageUrl
      }
    })

    return NextResponse.json(kategorija)

  } catch (error) {
    console.log('[KATEGORIJA_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function DELETE (
  req: Request,
  { params }: { params: { kategorijaId: string }}
) {
  try {
    const { userId } = auth()
    
    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if(!params.kategorijaId) {
      return new NextResponse("Kategorija ID je potrebna", {status: 400})
    }

    const kategorija = await prismadb.category.deleteMany({
      where: {
        id: params.kategorijaId,
      }
    })

    return NextResponse.json(kategorija)

  } catch (error) {
    console.log('[KATEGORIJA_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET (
  req: Request,
  { params }: { params: { kategorijaId: string }}
) {
  try {
    if(!params.kategorijaId) {
      return new NextResponse("Kategorija ID je potreban", {status: 400})
    }

    const kategorija = await prismadb.category.findUnique({
      where: {
        id: params.kategorijaId,
      }
    })

    return NextResponse.json(kategorija)

  } catch (error) {
    console.log('[KATEGORIJA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}