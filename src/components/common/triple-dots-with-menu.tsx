import tripleDots from "@/assets/triple-dots.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { ReactNode } from "react";

export async function TripleDotsWithMenu({
  children,
  triggerClassName,
  menuClassName,
}: {
  children: ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        <Image alt="menu trigger" src={tripleDots} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={menuClassName}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
