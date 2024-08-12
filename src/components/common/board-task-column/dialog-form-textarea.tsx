import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { textbodyL } from "@/styles/custom-class-names";
import { ComponentProps } from "react";

export function DialogFormTextArea(props: ComponentProps<"textarea">) {
  return (
    <Textarea
      className={cn(
        textbodyL,
        "border-border-grey border bg-transparent placeholder:text-black/25",
      )}
      {...props}
    />
  );
}
