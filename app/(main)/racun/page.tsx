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

  return (
    <div className="max-w-7xl mx-auto h-5/6">
      <AccountTabs kupljeniArtikli={kupljeniArtikli} />
    </div>
  );
}

export default MojRacunPage;