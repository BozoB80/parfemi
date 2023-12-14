import Image from "next/image";
import Link from "next/link";

interface CrumbsProps {
  page: string
  params?: string
  params2?: string
}

const BreadCrumbs = ({ page, params, params2 }: CrumbsProps) => {
  const decodedParams = params ? decodeURIComponent(params) : "";
  const decodedParams2 = params2 ? decodeURIComponent(params2) : "";

  const crumbs = [
    { label: 'Početna', href: '/' },
    { label: page, href: `/${page}` },
    { label: decodedParams, href: `/${page}/${params}` },
    { label: decodedParams2, href: `/${page}/${params}/${params2}` },
  ];

  return (
    <section className="py-3 sm:py-5">
    <div className="container max-w-screen-xl mx-auto px-4">
      <ol className="inline-flex flex-wrap text-secondary-foreground/60 space-x-1 items-center">
        {crumbs.map((crumb, index) => (
          <span key={index} className="flex">
            {index > 0 && params && <Image src="/icons/arrow-right.svg" alt="arrow" width={20} height={20} />}
            {index === 1 && !params && <Image src="/icons/arrow-right.svg" alt="arrow" width={20} height={20} />}
            
            {crumb.href && (
              <Link href={crumb.href} title={crumb.label} className={`capitalize text-sm ${index === crumbs.length - 1 ? 'text-black' : 'hover:underline hover:underline-offset-2 hover:text-black'}`}>
               
                  {crumb.label}
              
              </Link>
            )}
            {!crumb.href && (
              <span className="capitalize text-sm text-black">{crumb.label}</span>
            )}
          </span>
        ))}
      </ol>
    </div>
  </section>
  );
};

export default BreadCrumbs;