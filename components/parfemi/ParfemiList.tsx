"use client";

import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import ParfemCard from "./ParfemCard";
import { Filterbar } from "@/components/FilterBar";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ParfemiListProps {
  parfemi: (Product & {
    images: Image[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
  })[];
  totalAmount: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

const ParfemiList = ({
  parfemi,
  totalAmount,
  hasNextPage,
  hasPrevPage,
}: ParfemiListProps) => {
  const [selectedBrands, setSelectedBrands] = useState<(string | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    (string | null)[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "12";

  const currentPage = searchParams.get("page");
  const currentPageNum = currentPage ? parseInt(currentPage) : 1

  const adjacentPages = 1;

  // Calculate start and end page numbers to show
  const startPage = Math.max(currentPageNum - adjacentPages, 1); 
  const endPage = Math.min(currentPageNum + adjacentPages, Math.ceil(totalAmount / Number(per_page)));
  const lastPage = Math.ceil(totalAmount / Number(per_page));

  // Page numbers to show
  const pagesToShow = totalAmount <= Number(per_page)
  ? [1] // Show the only page if there's only one page
  : [
      ...(startPage === 1 ? [] : [1]), // Exclude startPage if it's 1
      -1,
      ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
      -1,
      ...(endPage === lastPage ? [] : [lastPage]), // Exclude endPage if it's the last page
    ];



  const filteredParfemi = parfemi.filter((parfem) => {
    const titleMatch = parfem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const brandLabelMatch = parfem.brand?.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (
      (selectedBrands.length === 0 ||
        selectedBrands.includes(parfem.brand?.id || "")) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(parfem.category?.id || "")) &&
      (searchQuery === "" || titleMatch || brandLabelMatch)
    ) {
      return true;
    }
    return false;
  });

  const onFilterReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
  }; 

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
            <h1 className="hidden lg:block capitalize font-semibold">
              {pathname.replace(/\s/g, " ").replace(/\/$/, " ").substring(1)}
            </h1>
            <Sheet>
              <SheetTrigger className="lg:hidden flex gap-2">
                <ListFilter size={24} />
                Filteri
              </SheetTrigger>
              <SheetContent side={"bottom"}>
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
                <div className="w-full h-auto flex justify-between rounded-xs py-2">
                  <Button variant="destructive" onClick={onFilterReset}>
                    Resetiraj
                  </Button>
                  <SheetClose asChild>
                    <Button disabled={filteredParfemi.length === 0}>
                      Potvrdi
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="font-semibold">
              {totalAmount}{" "}
              {totalAmount === 1 ? "proizvod" : "proizvoda"}
            </h1>
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredParfemi.map((parfem) => (
              <ParfemCard key={parfem.id} parfem={parfem} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center pt-8 gap-2">
            <Button
              variant="ghost"
              disabled={!hasPrevPage}
              onClick={() => {
                router.push(
                  `?page=${Number(page) - 1}&per_page=${per_page}`
                );
              }}
            >
              <ChevronLeft size={24} />
              <p className="hidden sm:block">Prethodna</p>
            </Button>

            {pagesToShow.map((page, index) => {
              if (page === -1) {
                // Remove ellipsis (...) if there are fewer than 3 pages or only one page
                if (pagesToShow.length < 5 || totalAmount <= Number(per_page)) {
                  return null;
                }
                // Remove ellipsis (...) if it's the second occurrence of -1
                if (index > 0 && index < pagesToShow.length - 1 && pagesToShow[index - 1] !== -1) {
                  return <span key={index}>...</span>;
                }
                return null;
              }

              return (
                <Link key={index} href={`?page=${page}&per_page=${per_page}`}>
                  <Button
                    size="icon"
                    variant={page === currentPageNum ? "default" : "ghost"}
                  >
                    {page}
                  </Button>
                </Link>
              );
            })}

            <Button
              variant="ghost"
              disabled={!hasNextPage}
              onClick={() => {
                router.push(
                  `?page=${Number(page) + 1}&per_page=${per_page}`
                );
              }}
            >
              <p className="hidden sm:block">Slijedeća</p>
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParfemiList;
