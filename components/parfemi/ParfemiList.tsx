"use client";

import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import ParfemCard from "./ParfemCard";
import { Filterbar } from "@/components/FilterBar";
import { useState } from "react";

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

  const filteredParfemi = parfemi.filter((parfem) => {
    if (
      (selectedBrands.length === 0 ||
        selectedBrands.includes(parfem.brand?.id || "")) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(parfem.category?.id || ""))
    ) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/6 hidden lg:block">
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
          />
        </div>
        <div className="w-5/6 max-lg:px-2 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredParfemi.map((parfem) => (
            <ParfemCard key={parfem.id} parfem={parfem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParfemiList;
