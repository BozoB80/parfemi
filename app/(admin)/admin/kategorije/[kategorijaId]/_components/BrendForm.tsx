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
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod";
import { Category } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData: Category | null
}


const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Uredi kategoriju" : "Dodaj kategoriju"
  const description = initialData ? "Uredi kategoriju" : "Dodaj novu kategoriju"
  const toastMessage = initialData ? "Kategorija ažurirana" : "Kategorija kreirana"
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj"

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/kategorije/${params.categoryId}`, data)
      } else {
        await axios.post(`/api/kategorije`, data)
      }
      router.push(`/admin/kategorije`)
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
      await axios.delete(`/api/kategorije/${params.categoryId}`)
      router.refresh()
      router.push(`/admin/kategorije`)
      toast({ description: "Kategorija izbrisana" })
      
     } catch (error) {
      toast({ variant: "destructive", description: "Kategorija nije izbrisana"})
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
      <Button
        variant="link"
        onClick={() => router.back()}
        className="pl-0"
      >
        <ArrowLeft className="mr-2" />
        Natrag na kategorije
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          
            <FormField 
              control={form.control}
              name="label"
              render={({field}) => (
                <FormItem className="max-w-md">
                  <FormLabel>Tekst</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading}
                      placeholder="Naziv kategorije"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
        
            <FormField 
                control={form.control}
                name="imageUrl"
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
            {isSubmitting && <Loader2  size={24} className="animate-spin mr-2" />}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default CategoryForm;