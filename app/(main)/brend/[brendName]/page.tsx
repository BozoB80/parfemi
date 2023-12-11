import BreadCrumbs from "@/components/Breadcrumbs";

interface BrandProps {
  params: {
    brendName: string
  }
}

const BrendNamePage = ({ params }: BrandProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="brend" params={params.brendName} />
    </div>
  );
}

export default BrendNamePage;