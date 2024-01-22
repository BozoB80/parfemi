import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/CategoryClient";
import { hr } from "date-fns/locale";

const CategoryPage = async () => {
  const category = await prismadb.category.findMany({
    orderBy: {
      createdAt: "asc"
    }
  })

  const formattedCategory: CategoryColumn[] = category.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    createdAt: format(item.createdAt, "dd.MM.yyyy", { locale: hr })
  }))

  return (
    <div className="w-full">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <CategoryClient data={formattedCategory} />
      </div>
    </div>
  );
}

export default CategoryPage;