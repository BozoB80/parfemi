'use client'

import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center bg-secondary">
      <CircleLoader 
        size={100}
        color="hsl(var(--primary))"
      />
    </div>
  );
}

export default Loader;