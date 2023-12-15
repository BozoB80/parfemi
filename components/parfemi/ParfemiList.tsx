import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import BreadCrumbs from "../Breadcrumbs";
import ParfemCard from "./ParfemCard";

interface ParfemiListProps {
  parfemi: (Product & {
    images: Image[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
  })[];
}

const ParfemiList = ({ parfemi }: ParfemiListProps) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/5 hidden lg:block">
          <p>Filteri</p>
        </div>
        <div className="max-lg:px-2  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          {parfemi.map((parfem) => (
            <ParfemCard key={parfem.id} parfem={parfem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParfemiList;
