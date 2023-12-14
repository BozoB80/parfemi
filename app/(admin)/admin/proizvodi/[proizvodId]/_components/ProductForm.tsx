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
import { PackagePlus, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import {
  Brand,
  Category,
  Image,
  PriceVariant,
  Product,
  Size,
} from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Naziv može biti od 2 do 50 karaktera" })
    .max(50),
  description: z
    .string()
    .min(2, { message: "Opis može biti od 2 do 1000 karaktera" })
    .max(1000),
  priceVariants: z.object({ label: z.string(), price: z.number() }).array(),
  discount: z.coerce.number().optional(),
  images: z.object({ url: z.string() }).array(),
  categoryId: z.string().min(1, { message: "Izaberite kategoriju" }),
  brandId: z.string().min(1, { message: "Izaberite brend" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        priceVariants: PriceVariant[];
      })
    | null;
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  brands,
  categories,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi proizvod" : "Dodaj proizvod";
  const description = initialData ? "Uredi proizvod" : "Dodaj novi proizvod";
  const toastMessage = initialData ? "Proizvod ažuriran" : "Proizvod kreiran";
  const action = initialData ? "Sačuvaj izmjene" : "Dodaj novi proizvod";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          priceVariants: initialData.priceVariants.map((item) => ({
            label: item.label || "",
            price: item.price || 0,
          })),
          discount: initialData.discount || 0,
          images: initialData.images || [],
          categoryId: initialData.categoryId || "",
          brandId: initialData.brandId || "",
        }
      : {
          title: "",
          description: "",
          priceVariants: [],
          discount: 0,
          images: [],
          categoryId: "",
          brandId: "",
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/proizvodi/${params.proizvodId}`, data);
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
      await axios.delete(`/api/proizvodi/${params.proizvodId}`);
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
          className="flex flex-col gap-4"
          //className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              name="discount"
              render={({ field }) => (
                <FormItem className="max-w-md">
                  <FormLabel>Popust (opcija)</FormLabel>
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
              name="priceVariants"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Unesite cijene</FormLabel>
                  {field.value.map((offer, index) => (
                    <div key={index} className="flex space-x-2">
                      <Select
                        value={offer.label || ""}
                        onValueChange={(selectedValue: string) => {
                          const newOtherOffers = [...field.value];
                          newOtherOffers[index] = {
                            ...newOtherOffers[index],
                            label: selectedValue,
                          };
                          field.onChange(newOtherOffers);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={offer.label}
                              placeholder="Izaberite mjeru"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.label}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormControl>
                        <Input
                          type="number"
                          value={offer.price.toString()}
                          onChange={(e) => {
                            const newOtherOffers = [...field.value];
                            newOtherOffers[index] = {
                              ...newOtherOffers[index],
                              price: Number(e.target.value),
                            };
                            field.onChange(newOtherOffers);
                          }}
                          placeholder="Unesite cijenu"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newOtherOffers = [...field.value];
                          newOtherOffers.splice(index, 1);
                          field.onChange(newOtherOffers);
                        }}
                      >
                        Izbriši
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    className="mr-auto"
                    onClick={() => {
                      const newOtherOffers = [
                        ...field.value,
                        { label: "", price: 0 },
                      ];
                      field.onChange(newOtherOffers);
                    }}
                  >
                    <PackagePlus className="w-4 h-4 mr-2" />
                    Dodaj cijenu
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="max-w-md">
                  <FormLabel>Slike</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value?.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...(field.value || []), { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...(field.value || []).filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={loading}
            size="lg"
            type="submit"
            className="md:w-60 mx-auto"
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
