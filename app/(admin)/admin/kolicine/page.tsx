import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/SizeClient";

const SizePage = async () => {
  const size = await prismadb.size.findMany({
    orderBy: {
      value: "asc"
    }
  })

  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    label: item.label,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <SizeClient data={formattedSize} />
      </div>
    </div>
  );
}

export default SizePage;