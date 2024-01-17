import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json();

    const { orderDetails, cartItems } = body;
    const { name, payment, phone, address, town, postal } = orderDetails;

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Niste prijavljeni", { status: 401 });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new NextResponse("Nema proizvoda u košarici", { status: 400 });
    }

    const orderItems = cartItems.map((cartItem) => ({
      priceVariant: {
        connect: { id: cartItem.id },
      },
      userId: user.id,
      title: cartItem.title,
      measure: cartItem.priceVariant.label,
      imageUrl: cartItem.images[0].url,
      brand: cartItem.brand.label,
      category: cartItem.category.label,
      price: cartItem.priceVariant.price,
      discount: cartItem.discount,
      quantity: cartItem.quantity,
    }));

    const order = await prismadb.order.create({
      data: {
        userId: user.id,
        userName: `${user?.firstName} ${user?.lastName}`,
        payment: payment,
        address: {
          create: {
            name,
            phone,
            address,
            town,
            postal
          }
        },
        orderItems: {
          create: orderItems,
        }, 
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.log("[KOŠARICA_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}