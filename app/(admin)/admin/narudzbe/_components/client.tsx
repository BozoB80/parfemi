"use client";

import { DataTable } from "@/components/ui/data-table";

import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";
import Heading from "@/components/ui/heading";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Narudžbe (${data.length})`} description="Pregled narudžbi" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};