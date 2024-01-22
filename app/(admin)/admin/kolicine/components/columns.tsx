"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CellAction from "./cell-action"

export type SizeColumn = {
  id: string
  label: string
  value: number
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
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
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Količina u ml
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="flex max-sm:text-xs max-sm:justify-center">{row.original.value}</span>
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
