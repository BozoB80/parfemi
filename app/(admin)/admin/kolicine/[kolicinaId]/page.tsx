import prismadb from "@/lib/prismadb";
import SizeForm from "./_components/SizeForm";



const SizeIdPage = async ({ params }: { params: { kolicinaId: string }}) => {

  let kolicina = null
  
  if (params.kolicinaId !== "new") {
    kolicina = await prismadb.size.findUnique({
      where: {
        id: params.kolicinaId
      }
    })
  } 

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm 
          initialData={kolicina}
        />
      </div>      
    </div>
  );
}

export default SizeIdPage;