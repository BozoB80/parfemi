"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string;
  userName: string
  address: string;
  payment: string;
  products: string;
  quantity: number;
  totalPrice: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Datum",
  },
  {
    accessorKey: "userName",
    header: "Korisnik",
  },
  {
    accessorKey: "products",
    header: "Artikli",
  },
  {
    accessorKey: "quantity",
    header: "Količina",
  },
  {
    accessorKey: "totalPrice",
    header: "Ukupna cijena",
  },
  {
    accessorKey: "payment",
    header: "Plaćanje",
  },  
  {
    accessorKey: "address",
    header: "Adresa",
  },
];