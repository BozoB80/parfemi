'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BrandsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";



interface BrandsClientProps {
  data: BrandsColumn[]
}

const BrandsClient: React.FC<BrandsClientProps> = ({ data }) => {
  const router = useRouter()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Brendovi (${data.length})`}
          description="Unesite brendove"
        />
        <Button onClick={() => router.push(`/admin/brendovi/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Novi brend
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default BrandsClient;