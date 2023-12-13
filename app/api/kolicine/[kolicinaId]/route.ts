import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { kolicinaId: string }}
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { label, value } = body

    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if (!label) {
      return new NextResponse("Morate unijeti naziv", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Unesite vrijednost", { status: 400 })
    }

    if(!params.kolicinaId) {
      return new NextResponse("Količina ID je potreban", {status: 400})
    }

    const kolicina = await prismadb.size.updateMany({
      where: {
        id: params.kolicinaId,
      },
      data: {
        label,
        value
      }
    })

    return NextResponse.json(kolicina)

  } catch (error) {
    console.log('[KOLICINA_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function DELETE (
  req: Request,
  { params }: { params: { kolicinaId: string }}
) {
  try {
    const { userId } = auth()
    
    if(!userId) {
      return new NextResponse("Molimo prijavite se", {status: 401})
    }

    if(!params.kolicinaId) {
      return new NextResponse("Kolicina ID je potrebna", {status: 400})
    }

    const kolicina = await prismadb.size.deleteMany({
      where: {
        id: params.kolicinaId,
      }
    })

    return NextResponse.json(kolicina)

  } catch (error) {
    console.log('[KOLICINA_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET (
  req: Request,
  { params }: { params: { kolicinaId: string }}
) {
  try {
    if(!params.kolicinaId) {
      return new NextResponse("Kolicina ID je potreban", {status: 400})
    }

    const kolicina = await prismadb.size.findUnique({
      where: {
        id: params.kolicinaId,
      }
    })

    return NextResponse.json(kolicina)

  } catch (error) {
    console.log('[KOLICINA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}