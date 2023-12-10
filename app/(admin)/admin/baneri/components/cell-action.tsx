'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BanerColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast"
import AlertModal from "@/components/modals/AlertModal";


interface CellActionProps {
  data: BanerColumn
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    try {
     setLoading(true)
     await axios.delete(`/api/baneri/${data.id}`)
     router.refresh()
     toast({description: "Baner izbrisan."})
    } catch (error) {
      toast({variant: "destructive", description: "Nešto nije u redu."})
    } finally {
     setLoading(false)
     setOpen(false)
    }
 }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>     
          <DropdownMenuItem onClick={() => router.push(`/admin/baneri/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />  
            Update
          </DropdownMenuItem>    
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />  
            Delete
          </DropdownMenuItem>    
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CellAction;