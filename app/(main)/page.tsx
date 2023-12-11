import Brands from "@/components/Brands";
import Carousel from "@/components/Carousel";
import prismadb from "@/lib/prismadb";

const Home = async () => {
  const baneri = await prismadb.baner.findMany()
  const brands = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })

  return (
    <div className="h-full">
      <Carousel baneri={baneri} />
      <Brands brands={brands} />
    </div>
  );
}

export default Home;