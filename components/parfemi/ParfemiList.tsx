"use client";

import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import ParfemCard from "./ParfemCard";
import { Filterbar } from "@/components/FilterBar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { ListFilter, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ParfemiListProps {
  parfemi: (Product & {
    images: Image[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
  })[];
}

const ParfemiList = ({ parfemi }: ParfemiListProps) => {
  const [selectedBrands, setSelectedBrands] = useState<(string | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(string | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pathname = usePathname()

  const filteredParfemi = parfemi.filter((parfem) => {
    const titleMatch = parfem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const brandLabelMatch = parfem.brand?.label.toLowerCase().includes(searchQuery.toLowerCase());

    if (
      (selectedBrands.length === 0 || selectedBrands.includes(parfem.brand?.id || '')) &&
      (selectedCategories.length === 0 || selectedCategories.includes(parfem.category?.id || '')) &&
      (searchQuery === '' || titleMatch || brandLabelMatch)
    ) {
      return true;
    }
    return false;
  });

  const onFilterReset = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSearchQuery('')
  }

  return (
    <div>
      <div className="flex w-full max-lg:p-0 max-xl:px-2">
        <div className="lg:w-1/6 hidden lg:block">
          <Filterbar
            brands={parfemi
              .map((p) => p.brand)
              .filter((brand) => brand !== null)}
            categories={parfemi
              .map((p) => p.category)
              .filter((category) => category !== null)}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            onBrandChange={(brand) =>
              setSelectedBrands((prevBrands) =>
                prevBrands.includes(brand)
                  ? prevBrands.filter((b) => b !== brand)
                  : [...prevBrands, brand]
              )
            }
            onCategoryChange={(category) =>
              setSelectedCategories((prevCategories) =>
                prevCategories.includes(category)
                  ? prevCategories.filter((c) => c !== category)
                  : [...prevCategories, category]
              )
            }
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 max-lg:px-2">
          <div className="flex justify-between items-center">
            <h1 className="hidden lg:block capitalize font-semibold">{pathname.replace(/\s/g, ' ').replace(/\/$/, ' ').substring(1)}</h1>
            <Sheet>
              <SheetTrigger className="lg:hidden flex gap-2">
                <ListFilter size={24} />
                Filteri
              </SheetTrigger>
              <SheetContent side={"bottom"}>
                <Filterbar
                  brands={parfemi.map((p) => p.brand).filter((brand) => brand !== null)}
                  categories={parfemi.map((p) => p.category).filter((category) => category !== null)}
                  selectedBrands={selectedBrands}
                  selectedCategories={selectedCategories}
                  onBrandChange={(brand) => setSelectedBrands((prevBrands) => prevBrands.includes(brand) ? prevBrands.filter((b) => b !== brand): [...prevBrands, brand])}
                  onCategoryChange={(category) =>
                    setSelectedCategories((prevCategories) =>
                      prevCategories.includes(category)
                        ? prevCategories.filter((c) => c !== category)
                        : [...prevCategories, category]
                    )
                  }
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <div className="w-full h-auto flex justify-between rounded-xs py-2">
                  <Button variant="destructive" onClick={onFilterReset}>Resetiraj</Button>  
                  <SheetClose asChild>
                    <Button disabled={filteredParfemi.length === 0}>Potvrdi</Button>               
                  </SheetClose>              
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="font-semibold">{filteredParfemi.length} {filteredParfemi.length === 1 ? 'proizvod' : 'proizvoda'}</h1>
          </div>

          <Separator className="my-2"/>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredParfemi.map((parfem) => (
              <ParfemCard key={parfem.id} parfem={parfem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParfemiList;
