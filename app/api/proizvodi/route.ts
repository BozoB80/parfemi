import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { title, description, priceVariants, discount, images, categoryId, brandId } = body;

    if (!userId) {
      return new NextResponse("Morate se prijaviti", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Naziv morate unijeti", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Opis morate unijeti", { status: 400 });
    }

    const proizvod = await prismadb.product.create({
      data: {
        title,
        description,
        priceVariants: {
          createMany: {
            data: priceVariants.map((item: { label: string, price: number }) => ({
              label: item.label,
              price: item.price
            }))
          }
        },
        discount, 
        categoryId,
        brandId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        },
      }
    });
  
    return NextResponse.json(proizvod);
  } catch (error) {
    console.log('[PROIZVOD_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};




export async function GET(req: Request) {
  try {
    const proizvod = await prismadb.product.findMany({
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