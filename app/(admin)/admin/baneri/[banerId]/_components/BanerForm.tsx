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
import { Loader2, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod";
import { Baner } from "@prisma/client";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BanerFormValues = z.infer<typeof formSchema>

interface BanerFormProps {
  initialData: Baner | null
}


const BanerForm: React.FC<BanerFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Uredi baner" : "Dodaj baner"
  const description = initialData ? "Uredi a baner" : "Dodaj novi baner"
  const toastMessage = initialData ? "Baner ažuriran" : "Baner kreiran"
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj"

  const form = useForm<BanerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  })

  const onSubmit = async (data: BanerFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/baneri/${params.banerId}`, data)
      } else {
        await axios.post(`/api/baneri`, data)
      }
      router.refresh()
      router.push(`/admin/baneri`)
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
      await axios.delete(`/api/baneri/${params.banerId}`)
      router.refresh()
      router.push(`/admin/baneri`)
      toast({ description: "Baner izbrisan" })
      
     } catch (error) {
      toast({ variant: "destructive", description: "Baner nije izbrisan"})
     } finally {
      setLoading(false)
      setOpen(false)
     }
  }

  const { isSubmitting } = form.formState

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
          <div className="max-w-md">
            <FormField 
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tekst</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Tekst banera"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <FormField 
                control={form.control}
                name="imageUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Pozadinska slika</FormLabel>
                    <FormControl>
                      <ImageUpload 
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Button disabled={loading} className="ml-auto" type="submit">
            {isSubmitting && <Loader2 size={24} className="animate-spin mr-2" />}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default BanerForm;