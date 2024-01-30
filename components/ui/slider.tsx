"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Tooltip = ({ value, className }: { value: number, className: string }) => (
  <div className={cn("absolute top-[20px] bg-white text-primary p-2 rounded-md shadow-md", className)}>
    {value.toFixed(0)} {/* Format the value as needed */}
  </div>
);

// Modified Slider component with tooltips
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [values, setValues] = React.useState<number[]>(props.defaultValue || [0, 0]);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center pt-2 pb-14",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {/* First Thumb with Tooltip */}
      <SliderPrimitive.Thumb
        className="block cursor-pointer h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative"
        style={{ zIndex: values[0] > values[1] ? 2 : 1 }}
      >
        <Tooltip value={values[0]} className="-left-0.5" />
      </SliderPrimitive.Thumb>
      {/* Second Thumb with Tooltip */}
      <SliderPrimitive.Thumb
        className="block cursor-pointer h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative"
        style={{ zIndex: values[1] > values[0] ? 2 : 1 }}
      >
        <Tooltip value={values[1]} className="-right-0.5" />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
