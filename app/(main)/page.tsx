import Brands from "@/components/Brands";
import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";
import DiscountMain from "@/components/DiscountMain";
import prismadb from "@/lib/prismadb";

const Home = async () => {
  const baneri = await prismadb.baner.findMany()
  const brands = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })
  const categories = await prismadb.category.findMany()
  const discountedProducts = await prismadb.product.findMany({
    where:{
      discount: {
        not: 0
      }
    },
    include: {
      brand: true,
      category: true,
      images: true,
      priceVariants: true
    }
  })


  return (
    <main>
      <Carousel baneri={baneri} height />
      <Brands brands={brands} />
      <DiscountMain products={discountedProducts} />
      <Categories categories={categories} />
    </main>
  );
}

export default Home;