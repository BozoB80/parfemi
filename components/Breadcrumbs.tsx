import Image from "next/image";
import Link from "next/link";

interface CrumbsProps {
  page: string
  params: string
}

const BreadCrumbs = ({ page, params }: CrumbsProps) => {
  const decodedParams = decodeURIComponent(params);

  const crumbs = [
    { label: 'Početna', href: '/' },
    { label: page, href: `/${page}` },
    { label: decodedParams, href: `/${page}/${params}` },
  ];

  return (
    <section className="py-3 sm:py-5">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-secondary-foreground/60 space-x-1 items-center">
          {crumbs.map((crumb, index) => (
          <span key={index} className="flex">
            {index > 0 && <Image src="/icons/arrow-right.svg" alt="arrow" width={20} height={20} />}
            {crumb.href && (
              <Link href={crumb.href} title={crumb.label} className="capitalize text-sm hover:underline hover:underline-offset-2 hover:text-black">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;