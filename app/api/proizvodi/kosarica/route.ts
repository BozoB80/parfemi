import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const body = await req.json();

    const { name, phone, address, town, postal, orderDetails, cartItems } = body;
    const { payment } = orderDetails;

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Niste prijavljeni", { status: 401 });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new NextResponse("Nema proizvoda u košarici", { status: 400 });
    }

    const orderItems = cartItems.map((cartItem) => ({
      product: {
        connect: { id: cartItem.id }, // Assuming each cart item has an 'id' property
      },
      userId: user.id,
      quantity: cartItem.quantity,
      // Add other properties you may want to save for each order item
    }));

    

    const order = await prismadb.order.create({
      data: {
        userId: user.id,
        userName: user.username || '',
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