"use client"

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEventHandler, useState } from "react";

const Searchbar = () => {
  const [value, setValue] = useState('')

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)    
  }

  return (
    <div className="relative hidden sm:block">
      <Search
        className="h-4 w-4 absolute top-3 left-1"
      />
      <Input
        onChange={onChange}
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