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
      <BreadCrumbs page="parfemi" params="" />
      <div className="hidden md:flex w-full">
        <div className="w-1/5">
          <p>Filteri</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          {parfemi.map((parfem) => (
            <ParfemCard key={parfem.id} parfem={parfem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParfemiList;
