import Brands from "@/components/Brands";
import Categories from "@/components/Categories";
import DiscountMain from "@/components/DiscountMain";
import HeroCarousel from "@/components/carousels/HeroCarousel";
import { Separator } from "@/components/ui/separator";
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
      <HeroCarousel baneri={baneri} />
      <Brands brands={brands} />
      <DiscountMain products={discountedProducts} />
      <Separator className="max-w-7xl mx-auto mb-8" />
      <Categories categories={categories} />
    </main>
  );
}

export default Home;