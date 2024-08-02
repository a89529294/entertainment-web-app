import tripleDots from "@/assets/triple-dots.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { ReactNode } from "react";

export function TripleDotsWithMenu({
  children,
  triggerClassName,
  menuClassName,
  align = "end",
}: {
  children: ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
  align?: "center" | "end" | "start";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        <Image alt="menu trigger" src={tripleDots} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={menuClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
