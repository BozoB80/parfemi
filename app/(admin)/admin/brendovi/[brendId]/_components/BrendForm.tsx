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
import { Brand } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  label: z.string().min(1),
  logo: z.string().min(1),
  description: z.string().min(1)
})

type BrendFormValues = z.infer<typeof formSchema>

interface BrendFormProps {
  initialData: Brand | null
}


const BrendForm: React.FC<BrendFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Uredi brend" : "Dodaj brend"
  const description = initialData ? "Uredi brend" : "Dodaj novi brend"
  const toastMessage = initialData ? "Brend ažuriran" : "Brend kreiran"
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj"

  const form = useForm<BrendFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      logo: '',
      description: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: BrendFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/brendovi/${params.brendId}`, data)
      } else {
        await axios.post(`/api/brendovi`, data)
      }
      router.push(`/admin/brendovi`)
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
      await axios.delete(`/api/brendovi/${params.brendId}`)
      router.refresh()
      router.push(`/admin/brendovi`)
      toast({ description: "Brend izbrisan" })
      
     } catch (error) {
      toast({ variant: "destructive", description: "Brend nije izbrisan"})
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
          <div className="max-w-lg">
            <FormField 
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tekst</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Tekst brenda"
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
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea 
                      disabled={loading}
                      placeholder="Unesite opis brenda"
                      className="max-w-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
                control={form.control}
                name="logo"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
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
          <Button disabled={loading} size="lg" className="ml-auto" type="submit">
            {isSubmitting && <Loader2 size={24} className="animate-spin mr-2" />}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default BrendForm;