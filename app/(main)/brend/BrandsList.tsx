import { Separator } from "@/components/ui/separator";
import { Brand } from "@prisma/client";
import Link from "next/link";

interface BrandsListProps {
  brendovi: Brand[];
}

interface GroupedBrands {
  [key: string]: Brand[];
}

const BrandsList = ({ brendovi }: BrandsListProps) => {
  brendovi.sort((a, b) => a.label.localeCompare(b.label));

  const groupedBrands: GroupedBrands = brendovi.reduce((acc, brand) => {
    const firstLetter = brand.label[0].toUpperCase();
    if (!acc[firstLetter]) {
      // Use type assertion here
      acc[firstLetter] = [] as Brand[];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {} as GroupedBrands);

  return (
    <div className="py-4">
      <h1 className="text-center text-2xl font-semibold underline underline-offset-2">Naši brendovi</h1>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 px-2 gap-8 py-8">
        {Object.keys(groupedBrands).map((letter) => (
          <div key={letter}>
            <p className="font-bold text-xl">{letter}</p>
            <Separator className="my-2" />
            {groupedBrands[letter].map((brand) => (
              <Link
                key={brand.id}
                href={`/brend/${brand.label.toLowerCase().replace(/\s/g, "-")}`}
                className="flex flex-col hover:text-primary hover:font-semibold"
              >
                {brand.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
