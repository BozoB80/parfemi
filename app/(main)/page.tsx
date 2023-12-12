import Brands from "@/components/Brands";
import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";
import prismadb from "@/lib/prismadb";

const Home = async () => {
  const baneri = await prismadb.baner.findMany()
  const brands = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })
  const categories = await prismadb.category.findMany({
  
  })

  return (
    <main>
      <Carousel baneri={baneri} />
      <Brands brands={brands} />
      <Categories categories={categories} />
    </main>
  );
}

export default Home;