"use client"

import { Brand, Category } from "@prisma/client";
import Slider from 'rc-slider';
import Range from "rc-slider"
import 'rc-slider/assets/index.css';

import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface FilterbarProps {
  brands: (Brand | null)[];
  categories: (Category | null)[];
  selectedBrands: (string | null)[];
  selectedCategories: (string | null)[];
  searchQuery: string
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
  onSearchChange
}: FilterbarProps) => {
  const uniqueBrands = Array.from(new Set(brands.map((brand) => brand?.id))).map(
    (brandId) => brands.find((brand) => brand?.id === brandId)!
  );

  const uniqueCategories = Array.from(new Set(categories.map((category) => category?.id))).map(
    (categoryId) => categories.find((category) => category?.id === categoryId)!
  );

  return (
    <div className="flex flex-col gap-2 sm:gap-6 pr-2">
      <div className="relative">
        <p className="font-semibold">Pretražite:</p>
        <Separator className="hidden sm:my-2" />
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
        <ScrollArea className="h-60 overflow-y-scroll sm:hidden">
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
        {/* <Slider
            range
            
            defaultValue={[minPrice, maxPrice]}
            onChange={(value) => onPriceChange(value[0], value[1])}
        /> */}
      </div>
    </div>
  );
};