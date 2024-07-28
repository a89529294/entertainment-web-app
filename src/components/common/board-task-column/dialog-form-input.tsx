import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { textbodyL } from "@/styles/custom-class-names";
import { ComponentProps } from "react";

export function DialogFormInput(props: ComponentProps<"input">) {
  return (
    <Input className={cn(textbodyL, "placeholder:text-black/25")} {...props} />
  );
}
