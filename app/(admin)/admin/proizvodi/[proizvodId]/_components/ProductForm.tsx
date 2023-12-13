"use client";

import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { Brand, Category, Image, Product, Size } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(1000),
  sizes: z.object({ label: z.string(), price: z.coerce.number() }).array(),
  discount: z.coerce.number().min(1).optional(),
  rating: z.coerce.number().min(1).optional(),
  images: z.object({ imageUrl: z.string() }).array(),
  categoryId: z.string().min(1),
  brandId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        sizes: Size[];
      })
    | null;
  categories: Category[];
  brands: Brand[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  brands,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi proizvod" : "Dodaj proizvod";
  const description = initialData ? "Uredi proizvod" : "Dodaj novi proizvod";
  const toastMessage = initialData ? "Proizvod ažuriran" : "Proizvod kreiran";
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          sizes: initialData.sizes || [],
          discount: initialData.discount || 0,
          rating: initialData.rating || 0,
          images: initialData.images || [],
          categoryId: initialData.categoryId || "",
          brandId: initialData.brandId || "",
        }
      : {
          title: "",
          description: "",
          sizes: [],
          discount: 0,
          rating: 0,
          images: [],
          categoryId: "",
          brandId: "",
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/proizvodi/${params.productId}`, data);
      } else {
        await axios.post(`/api/proizvodi`, data);
      }
      router.push(`/admin/proizvodi`);
      router.refresh();
      toast({ description: toastMessage });
    } catch (error) {
      toast({ variant: "destructive", description: "Nešto nije u redu." });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/proizvodi/${params.productId}`);
      router.refresh();
      router.push(`/admin/proizvodi`);
      toast({ description: "Proizvod izbrisan" });
    } catch (error) {
      toast({ variant: "destructive", description: "Proizvod nije izbrisan" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-3 gap-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Naziv</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Naziv proizvoda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Unesite opis proizvoda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Kategorija</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Izaberite kategoriju"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <p className="capitalize">{category.label}</p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Brend</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Izaberite brend"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        <p className="capitalize">{brand.label}</p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Popust</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="number"
                    placeholder="Unesite popust"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slike</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.imageUrl)}
                    onChange={(url) =>
                      field.onChange([...(field.value || []), { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (current) => current.imageUrl !== url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            size="lg"
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ProductForm;
