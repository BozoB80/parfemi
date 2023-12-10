'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BanerColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";



interface BanerClientProps {
  data: BanerColumn[]
}

const BanerClient: React.FC<BanerClientProps> = ({ data }) => {
  const router = useRouter()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Baneri (${data.length})`}
          description="Postavite slike na glavnoj stranici"
        />
        <Button onClick={() => router.push(`/admin/baneri/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Novi baner
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default BanerClient;