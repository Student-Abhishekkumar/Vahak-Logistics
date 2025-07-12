import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Sheet = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fixed inset-0 z-50", className)} {...props} />
))
Sheet.displayName = "Sheet"

const SheetTrigger = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} className={cn("", className)} {...props} />;
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-y-0 right-0 z-50 w-4/5 bg-background shadow-lg",
      className
    )}
    {...props}
  />
))
SheetContent.displayName = "SheetContent"

const SheetClose = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("", className)} {...props} />
))
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
}