"use client"

import { Brand, Category, PriceVariant, Product } from "@prisma/client";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import { FormEventHandler, useState } from "react";
import ReactSlider from "react-slider";

interface FilterbarProps {
  brands: (Brand | null)[];
  categories: (Category | null)[];
  selectedBrands: (string | null)[];
  selectedCategories: (string | null)[];
  searchQuery: string
  parfemi: (Product & { priceVariants: PriceVariant[] })[]

  onBrandChange: (brand: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (searchQuery: string) => void

}

export const Filterbar = ({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  searchQuery,
  onBrandChange,
  onCategoryChange,
  onSearchChange,
  parfemi,
}: FilterbarProps) => {
  const minPricesForPerfumes = parfemi.map((parfem) => {
    const allPrices = parfem.priceVariants.map((priceVariant) => priceVariant.price);
    const minPrice = Math.min(...allPrices);
    return minPrice;
  });  
  const overallMinPrice = Math.min(...minPricesForPerfumes);

  // Find the maximum price for each perfume
  const maxPricesForPerfumes = parfemi.map((parfem) => {
    const allPrices = parfem.priceVariants.map((priceVariant) => priceVariant.price);
    const maxPrice = Math.max(...allPrices);
    return maxPrice;
  });
  const overallMaxPrice = Math.max(...maxPricesForPerfumes);
  const [sliderValues, setSliderValues] = useState([overallMinPrice, overallMaxPrice])

  
  const uniqueBrands = Array.from(new Set(brands.map((brand) => brand?.id))).map(
    (brandId) => brands.find((brand) => brand?.id === brandId)!
  );  

  const uniqueCategories = Array.from(new Set(categories.map((category) => category?.id))).map(
    (categoryId) => categories.find((category) => category?.id === categoryId)!
  );
  

  return (
    <div className="flex flex-col gap-2 sm:gap-6 max-lg:p-4 lg:pr-2">
      <div className="relative">
        {/* <h1 className="text-center font-semibold sm:hidden">Filteri</h1> */}
        <p className="font-semibold">Pretražite:</p>
        <Separator className="hidden sm:block sm:my-2" />
        <Input
          value={searchQuery}
          placeholder="Upišite tekst..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="relative border p-2"
        />
        {searchQuery && (
          <X onClick={() => onSearchChange("")} className="h-4 w-4 absolute bottom-3 right-2 cursor-pointer" />
        )}
      </div>

      <div>
        <p className="font-semibold">Kategorije:</p>
        <Separator className="my-1 sm:my-2" />
        {uniqueCategories.map((category) => (
          <label key={category?.id} className="flex gap-2 capitalize cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              value={category?.id || ''}
              checked={selectedCategories.includes(category?.id || '')}
              onChange={() => onCategoryChange(category?.id || '')}
            />
            {category?.label}
          </label>
        ))}
      </div>

      <div>
        <p className="font-semibold">Brend:</p>
        <Separator className="my-1 sm:my-2" />
        <ScrollArea className="max-lg:h-60 overflow-y-scroll">
          {uniqueBrands.sort((a, b) => (a.label || '').localeCompare(b.label || '')).map((brand) => (
            <label key={brand?.id} className="flex gap-2 cursor-pointer hover:text-primary">
              <input
                type="checkbox"
                value={brand?.id || ''}
                checked={selectedBrands.includes(brand?.id || '')}
                onChange={() => onBrandChange(brand?.id || '')}
              />
              {brand?.label}
            </label>
          ))}
        </ScrollArea>
      </div>      

      <div>
        <p className="font-semibold">Cijena:</p>
        <Separator className="my-2" />
    
        <ReactSlider 
          min={overallMinPrice}
          max={overallMaxPrice}
          value={sliderValues}
          onChange={setSliderValues}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          className="py-4 w-full flex justify-center items-center"        
          thumbClassName="w-4 h-4 rounded-full bg-white ring-2 ring-primary"
          trackClassName=" h-2 rounded-lg bg-secondary"
          pearling
          minDistance={10}
        />

        <div>{sliderValues[0]} - {sliderValues[1]} </div>

        <h1>Raspon: {sliderValues[1] - sliderValues[0]} </h1>
      </div>
    </div>
  );
};