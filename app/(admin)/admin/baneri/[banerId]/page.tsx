import prismadb from "@/lib/prismadb";
import BanerForm from "./_components/BanerForm";

const BillboardsIdPage = async ({ params }: { params: { banerId: string }}) => {

  let baner = null
  
  if (params.banerId !== "new") {
    baner = await prismadb.baner.findUnique({
      where: {
        id: params.banerId
      }
    })
  } 

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BanerForm 
          initialData={baner}
        />
      </div>      
    </div>
  );
}

export default BillboardsIdPage;