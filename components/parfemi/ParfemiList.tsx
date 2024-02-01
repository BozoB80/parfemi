"use client";

import {
  Brand,
  Category,
  Image,
  PriceVariant,
  Product,
  Wishlist,
} from "@prisma/client";
import ParfemCard from "./ParfemCard";
import { Filterbar } from "@/components/FilterBar";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import LoadMore from "../LoadMore";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";

export interface ParfemiListProps {
  parfemi: (Product & {
    images: Image[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
    wishlist: Wishlist[];
  })[];
}

const ParfemiList = ({ parfemi }: ParfemiListProps) => {
  const [selectedBrands, setSelectedBrands] = useState<(string | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(string | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleParfemi, setVisibleParfemi] = useState<number>(8);
  const [totalParfemi, setTotalParfemi] = useState<number>(parfemi.length);

  // Min and max prices for slider
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

  const pathname = usePathname();

  const filteredParfemi = parfemi
    .filter((parfem) => {
      const titleMatch = parfem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const brandLabelMatch = parfem.brand?.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
          // Check if the perfume price is within the slider range
          const minPrice = Math.min(...parfem.priceVariants.map((pv) => pv.price));
          const maxPrice = Math.max(...parfem.priceVariants.map((pv) => pv.price));
          const priceInRange = minPrice >= sliderValues[0] && maxPrice <= sliderValues[1];
    

      return (
        (selectedBrands.length === 0 ||
          selectedBrands.includes(parfem.brand?.id || "")) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(parfem.category?.id || "")) &&
        (searchQuery === "" || titleMatch || brandLabelMatch) && 
        (priceInRange)

      );
    })
    .slice(0, visibleParfemi);

  const loadMoreItems = useCallback(() => {
    // Increase the number of visible items by 4 (or any other desired amount)
    setVisibleParfemi((prevVisibleParfemi) => prevVisibleParfemi + 4);
  }, []);

  useEffect(() => {
    // Update the total number of items when the parfemi prop changes
    setTotalParfemi(parfemi.length);
  }, [parfemi]);

  useEffect(() => {
    const handleScroll = () => {
      // Load more items when the user reaches the bottom
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isBottom) {
        loadMoreItems();
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleParfemi, totalParfemi, loadMoreItems]);

  const onSliderChange = useCallback((newSliderValues: number[]) => {
    setSliderValues(newSliderValues);

    const filteredBySliderParfemi = parfemi.filter((parfem) => {
      const minPrice = Math.min(...parfem.priceVariants.map((pv) => pv.price));
      const maxPrice = Math.max(...parfem.priceVariants.map((pv) => pv.price));

      // Check if the perfume price is within the slider range
      return minPrice >= newSliderValues[0] && maxPrice <= newSliderValues[1];
    });

    // Update the visibleParfemi state based on the filtered results
    setVisibleParfemi(filteredBySliderParfemi.length > visibleParfemi ? visibleParfemi + 4 : visibleParfemi);
  }, [parfemi, visibleParfemi]);

  const onFilterReset = () => {
    // Reset the filters and set visible items back to the initial value
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setVisibleParfemi(8);
  };

  return (
    <div className="flex w-full max-lg:p-0 max-xl:px-2 max-sm:pb-20 pb-2">
      <div className="lg:w-1/6 hidden lg:block">
        <Filterbar
          brands={parfemi.map((p) => p.brand).filter((brand) => brand !== null)}
          categories={parfemi.map((p) => p.category).filter((category) => category !== null)}
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
          minPrice={overallMinPrice}
          maxPrice={overallMaxPrice}
          sliderValues={sliderValues}
          onSliderChange={onSliderChange}
        />
      </div>

      <div className="flex flex-col w-full lg:w-5/6 max-lg:px-2">
        <div className="flex justify-between items-center">
          <h1 className="hidden lg:block capitalize font-semibold">
            {pathname.replace(/\s/g, " ").replace(/\/$/, " ").substring(1)}
          </h1>
          <Drawer>
            <DrawerTrigger className="lg:hidden flex gap-2">
              <ListFilter size={24} />
              Filteri
            </DrawerTrigger>
            <DrawerContent>
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
                minPrice={overallMinPrice}
                maxPrice={overallMaxPrice}
                sliderValues={sliderValues}
                onSliderChange={onSliderChange}
              />
              <div className="w-full h-auto flex justify-between rounded-xs max-lg:px-4 py-2">
                <Button variant="destructive" onClick={onFilterReset}>
                  Resetiraj
                </Button>
                <DrawerClose asChild>
                  <Button disabled={filteredParfemi.length === 0}>
                    Potvrdi
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="font-semibold">
            {selectedBrands.length === 0 &&
            selectedCategories.length === 0 &&
            searchQuery === ""
              ? `${parfemi.length} ${
                  parfemi.length === 1 ? "proizvod" : "proizvoda"
                }`
              : `${filteredParfemi.length} ${
                  filteredParfemi.length === 1 ? "proizvod" : "proizvoda"
                }`
            }
          </h1>
        </div>

        <Separator className="my-2" />

        {filteredParfemi.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            Nema rezultata
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredParfemi.map((parfem) => (
              <ParfemCard key={parfem.id} parfem={parfem} />
            ))}
          </div>
        )}

        {visibleParfemi < totalParfemi && (
          <LoadMore onLoadMore={loadMoreItems} />
        )}
      </div>
    </div>
  );
};

export default ParfemiList;
