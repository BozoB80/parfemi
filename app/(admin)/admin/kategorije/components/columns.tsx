"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-action"
import Image from "next/image"


export type CategoryColumn = {
  id: string
  label: string
  imageUrl: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Naziv
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slika
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Image 
        src={row.original.imageUrl}
        alt="logo"
        width={200}
        height={50}
      />
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum izrade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-center">{row.original.createdAt}</span>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
