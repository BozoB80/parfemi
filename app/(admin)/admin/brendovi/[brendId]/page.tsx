import prismadb from "@/lib/prismadb";
import BrendForm from "./_components/BrendForm";


const BrandsIdPage = async ({ params }: { params: { brendId: string }}) => {

  let brend = null
  
  if (params.brendId !== "new") {
    brend = await prismadb.brand.findUnique({
      where: {
        id: params.brendId
      }
    })
  } 

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrendForm 
          initialData={brend}
        />
      </div>      
    </div>
  );
}

export default BrandsIdPage;