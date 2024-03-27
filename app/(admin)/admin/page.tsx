import { Overview } from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGraphRevenue } from "@/lib/get-graph-revenue";
import prismadb from "@/lib/prismadb";
import { Coins, CreditCard, Package } from "lucide-react";

const AdminPage = async () => {
  const graphRevenue = await getGraphRevenue();

  const orders = await prismadb.order.findMany({
    include: {
      orderItems: {
        include: {
          priceVariant: true,
        },
      },
    },
  });

  // total Revenue
  const orderItems = await prismadb.orderItem.findMany({
    select: {
      price: true,
      quantity: true,
    },
  });

  let totalSum = 0;
  for (const orderItem of orderItems) {
    totalSum += orderItem.price * orderItem.quantity;
  }

  // totalOrders
  const salesCount = await prismadb.order.count();

  // best sale
  const soldItems = await prismadb.orderItem.groupBy({
    by: ["priceVariantId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
  });

  const bestSoldPriceVariantId = soldItems[0].priceVariantId;

  if (!bestSoldPriceVariantId) return null;

  const bestSoldName = await prismadb.priceVariant.findUnique({
    where: {
      id: bestSoldPriceVariantId,
    },
    include: {
      Product: true,
    },
  });

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
              <Coins className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KM {totalSum.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Broj narudžbi
              </CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
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
              <Package className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <p>{bestSoldName?.Product?.title}</p>
                <p>(Prodano primjeraka: {soldItems[0]._sum.quantity})</p>                 
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
};

export default AdminPage;
