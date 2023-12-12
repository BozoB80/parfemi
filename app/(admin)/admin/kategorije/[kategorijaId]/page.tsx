import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/BrendForm";



const CategoryIdPage = async ({ params }: { params: { kategorijaId: string }}) => {

  let kategorija = null
  
  if (params.kategorijaId !== "new") {
    kategorija = await prismadb.category.findUnique({
      where: {
        id: params.kategorijaId
      }
    })
  } 

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          initialData={kategorija}
        />
      </div>      
    </div>
  );
}

export default CategoryIdPage;