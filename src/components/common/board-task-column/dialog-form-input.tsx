import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { textbodyL } from "@/styles/custom-class-names";
import { ComponentProps, forwardRef } from "react";

export const DialogFormInput = forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>((props, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(textbodyL, "placeholder:text-black/25")}
      {...props}
    />
  );
});

DialogFormInput.displayName = "DialogFormInput";
