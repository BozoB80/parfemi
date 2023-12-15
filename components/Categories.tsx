"use client"

import { Category } from "@prisma/client";
import { Card, CardContent, CardFooter } from "./ui/card";import { useRouter } from "next/navigation";
;

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto max-lg:px-8 flex flex-col sm:flex-row justify-between items-center w-full gap-8">
      {categories.map((category) => (
        <Card
          key={category.id}
          onClick={() => router.push(`/parfemi/${category.label.toLowerCase().replace(/\s/g, '-')}`)}
          className="w-full bg-no-repeat bg-cover bg-center lg:hover:scale-105 transition-all duration-500 cursor-pointer"
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        >
          <CardContent className="flex items-end pt-8 sm:pt-80">
            <CardFooter className="w-full py-3 bg-primary-foreground/20 flex justify-center items-center uppercase text-white/90 text-xl font-semibold">
              {category.label}
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Categories;
