"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BanerColumn } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Edit2,
  Edit3,
  EditIcon,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modals/AlertModal";

interface CellActionProps {
  data: BanerColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/baneri/${data.id}`);
      router.refresh();
      toast({ description: "Baner izbrisan." });
    } catch (error) {
      toast({ variant: "destructive", description: "Nešto nije u redu." });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Button size="icon" variant="ghost" onClick={() => router.push(`/admin/baneri/${data.id}`)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive" onClick={() => setOpen(true)}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CellAction;
