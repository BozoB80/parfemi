'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";



interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter()
 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Količine (${data.length})`}
          description="Unesite količine"
        />
        <Button onClick={() => router.push(`/admin/kolicine/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova vrijednost
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
}

export default SizeClient;