import prismadb from "@/lib/prismadb";
import { BanerColumn } from "./components/columns";
import { format } from "date-fns";
import BanerClient from "./components/BanerClient";
import { hr } from "date-fns/locale";

const BannerPage = async () => {
  const baners = await prismadb.baner.findMany({
    orderBy: {
      createdAt: "asc"
    }
  })

  const formattedBaners: BanerColumn[] = baners.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "dd.MM.yyyy", { locale: hr })
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <BanerClient data={formattedBaners} />
      </div>
    </div>
  );
}

export default BannerPage;