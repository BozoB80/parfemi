import prismadb from "@/lib/prismadb";
import BrandsList from "./BrandsList";

const BrendPage = async () => {
  const brendovi = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })
  
  return (
    <div className="max-w-7xl mx-auto">
      <BrandsList brendovi={brendovi} />
    </div>
  );
}

export default BrendPage;