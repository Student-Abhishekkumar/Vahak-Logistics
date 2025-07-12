import * as React from "react";
import { cn } from "@/lib/utils"; 

const Progress = React.forwardRef(({ value, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <div
      className="flex-1 w-full h-full transition-all bg-primary"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }