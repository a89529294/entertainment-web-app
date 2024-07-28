import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function DialogFormLabel({
  children,
  label,
  className,
}: {
  children?: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Label className={cn("flex flex-col gap-2", className)}>
      <span className="font-bold text-medium-grey ">{label}</span>
      {children}
    </Label>
  );
}
