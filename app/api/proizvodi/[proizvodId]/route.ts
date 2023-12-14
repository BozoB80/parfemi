import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { proizvodId: string } }
) {
  try {
    if (!params.proizvodId) {
      return new NextResponse("Proizvod id je potreban", { status: 400 });
    }

    const proizvod = await prismadb.product.findUnique({
      where: {
        id: params.proizvodId
      },
      include: {
        images: true,
        category: true,
        brand: true,
        priceVariants: true
      }
    });
  
    return NextResponse.json(proizvod);
  } catch (error) {
    console.log('[PROIZVOD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { proizvodId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Potrebno se prijaviti", { status: 403 });
    }

    if (!params.proizvodId) {
      return new NextResponse("Proizvod id je potreban", { status: 400 });
    }

    const proizvod = await prismadb.product.delete({
      where: {
        id: params.proizvodId
      }
    });
  
    return NextResponse.json(proizvod);
  } catch (error) {
    console.log('[PROIZVOD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { proizvodId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { title, description, priceVariants, discount, images, categoryId, brandId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!priceVariants || !priceVariants.length) {
      return new NextResponse("PriceVariants are required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Release date is required", { status: 400 });
    }

    await prismadb.product.update({
      where: {
        id: params.proizvodId
      },
      data: {
        title,
        description,
        discount,
        categoryId,
        brandId,
        priceVariants: {
          deleteMany: {}
        },
        images: {
          deleteMany: {}
        }
      }
    });

    await prismadb.product.update({
      where: {
        id: params.proizvodId
      },
      data: {
        priceVariants: {
          createMany: {
            data: priceVariants.map((item: { label: string, price: number }) => ({
              label: item.label,
              price: item.price
            }))
          }
        },
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({
              url: image.url
            }))
          }
        }
      }
    });

    const proizvod = await prismadb.product.findUnique({
      where: {
        id: params.proizvodId
      },
      include: {
        images: true,
        category: true,
        brand: true,
        priceVariants: true
      }
    });
  
    return NextResponse.json(proizvod);
  } catch (error) {
    console.log('[PROIZVOD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};