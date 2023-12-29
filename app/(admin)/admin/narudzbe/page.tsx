import prismadb from "@/lib/prismadb";
import { OrderClient } from "./_components/client";
import { OrderColumn } from "./_components/columns";
import { format } from "date-fns";
import { hr } from "date-fns/locale";

const NarudzbePage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: true,
      address: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    userName: order.userName,
    address: order.address.town,
    payment: order.payment,
    products: order.orderItems.map((item) => item.title).join(", "),
    quantity: order.orderItems.reduce((sum, item) => {return sum + item.quantity}, 0),
    totalPrice: order.orderItems.reduce(
      (total, orderItem) =>
        total +
        (orderItem.price * orderItem.quantity * (100 - (orderItem.discount ?? 0))) /
          100,
      0
    ).toFixed(2),
    createdAt: format(order.createdAt, "dd.MM.yyyy", { locale: hr })
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default NarudzbePage;