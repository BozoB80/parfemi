'use client'

import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod";
import { Size } from "@prisma/client";

const formSchema = z.object({
  label: z.string().min(1),
  value: z.coerce.number().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
  initialData: Size | null
}


const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Uredi količinu" : "Dodaj količinu"
  const description = initialData ? "Uredi količinu" : "Dodaj novu količinu"
  const toastMessage = initialData ? "Količina ažurirana" : "Količina kreirana"
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj"

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      value: 0
    }
  })

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/kolicine/${params.sizeId}`, data)
      } else {
        await axios.post(`/api/kolicine`, data)
      }
      router.push(`/admin/kolicine`)
      router.refresh()
      toast({ description: toastMessage })
      
    } catch (error) {
      toast({ variant: "destructive", description: "Nešto nije u redu."})
    } finally {
      setLoading(false)
    }    
  }

  const onDelete = async () => {
     try {
      setLoading(true)
      await axios.delete(`/api/kolicine/${params.sizeId}`)
      router.refresh()
      router.push(`/admin/kolicine`)
      toast({ description: "Količina izbrisana" })
      
     } catch (error) {
      toast({ variant: "destructive", description: "Količina nije izbrisana"})
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
      <div className="flex items-center justify-between">
        <Heading 
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          
            <FormField 
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem className="max-w-md">
                  <FormLabel>Naziv</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Naziv količine"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
        
            <FormField 
                control={form.control}
                name="value"
                render={({field}) => (
                  <FormItem className="max-w-md">
                    <FormLabel>Vrijednost</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading}
                        type="number"
                        placeholder="Unesite jedinicu mjere"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Button disabled={loading} size="lg" className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default SizeForm;