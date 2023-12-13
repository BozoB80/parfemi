'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";



interface ProductClientProps {
  data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Proizvodi (${data.length})`}
          description="Unesite proizvode"
        />
        <Button onClick={() => router.push(`/admin/proizvodi/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Novi proizvod
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
}

export default ProductClient;