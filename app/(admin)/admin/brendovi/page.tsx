import prismadb from "@/lib/prismadb";
import { BrandsColumn } from "./components/columns";
import { format } from "date-fns";
import BrandsClient from "./components/BrandsClient";
import { hr } from "date-fns/locale";

const BrandsPage = async () => {
  const brands = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })

  const formattedBrands: BrandsColumn[] = brands.map((item) => ({
    id: item.id,
    label: item.label,
    logo: item.logo,
    description: item.description,
    createdAt: format(item.createdAt, "dd.MM.yyyy", { locale: hr })
  }))

  return (
    <div className="w-full">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <BrandsClient data={formattedBrands} />
      </div>
    </div>
  );
}

export default BrandsPage;