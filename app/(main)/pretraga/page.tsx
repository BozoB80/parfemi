"use client"

import { useSearchParams } from "next/navigation";

const PretragaPage = () => { 
  const searchParams = useSearchParams()

  const q = searchParams.get('q') ?? ''
  

  return (
    <div>
      {q}
    </div>
  );
}

export default PretragaPage;