"use client"

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)    
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      router.push(`/pretraga?q=${encodeURIComponent(value)}`)
    }
  };

  return (
    <div className="relative hidden sm:block">
      <Search
        className="h-4 w-4 absolute top-3 left-1"
      />
      <Input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        className="w-full sm:w-40 lg:w-72 pl-9 bg-transparent border-x-0 border-t-0 rounded-none focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder="Pretražite"
      />
      {value && (
        <X onClick={() => setValue("")} className="h-4 w-4 absolute top-3 right-1 cursor-pointer" />
      )}
    </div>
  );
}

export default Searchbar;