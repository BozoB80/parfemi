import AccountTabs from "@/components/AccountTabs";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const MojRacunPage = async () => {
  const { userId } = auth();

  if (!userId) return

  const kupljeniArtikli = await prismadb.orderItem.findMany({
    where: {
      userId: userId
    },
    include: {
      order: true
    }
  })

  const narudzbe = await prismadb.order.findMany({
    where: {
      userId: userId
    },
    include: {
      orderItems: true,
      address: true
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return (
    <div className="max-w-7xl mx-auto">
      <AccountTabs kupljeniArtikli={kupljeniArtikli} narudzbe={narudzbe} />
    </div>
  );
}

export default MojRacunPage;