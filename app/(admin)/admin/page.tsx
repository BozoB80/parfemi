import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="flex flex-1 justify-center items-center w-full h-screen">
      <Link href="/">
          <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={150}
            className="cursor-pointer max-sm:w-40"
          />
        </Link>
    </div>
  );
}

export default AdminPage;