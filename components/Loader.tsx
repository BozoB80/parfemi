'use client'

import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center bg-gray-100/50 z-[9999]">
      <CircleLoader 
        size={100}
        color="hsl(var(--primary))"
      />
    </div>
  );
}

export default Loader;