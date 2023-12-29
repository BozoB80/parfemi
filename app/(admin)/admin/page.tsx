import { Overview } from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGraphRevenue } from "@/lib/get-graph-revenue";
import prismadb from "@/lib/prismadb";
import { CreditCard, DollarSign, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminPage = async () => {
  const graphRevenue = await getGraphRevenue()

  const orders = await prismadb.order.findMany({
    include: {
      orderItems: true
    },
  });

  const salesCount = await prismadb.order.count()

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.price
    }, 0)
    return total + orderTotal
  }, 0)

  const productSalesCount: Record<string, number> = {};

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const productId = item.id;
      if (productSalesCount[productId]) {
        productSalesCount[productId]++;
      } else {
        productSalesCount[productId] = 1;
      }
    });
  });

  let mostPopularProductId = null;
  let maxSalesCount = 0;
  for (const productId in productSalesCount) {
    if (productSalesCount[productId] > maxSalesCount) {
      mostPopularProductId = productId;
      maxSalesCount = productSalesCount[productId];
    }
  }

  let mostPopularProductTitle = "Artikal ne postoji";
  if (mostPopularProductId) {
    const mostPopularProduct = await prismadb.product.findUnique({
      where: {
        id: mostPopularProductId
      }
    });
  
    if (mostPopularProduct) {
      mostPopularProductTitle = mostPopularProduct.title;
    }
  }

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Heading title="Izvještaji" description="Pregled vaše trgovine" />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ukupna prodaja
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KM {totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Broj narudžbi</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ {salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Najprodavaniji artikal
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
              {mostPopularProductTitle} (Broj primjeraka: {maxSalesCount})
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pregled</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPage;