import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BoardIcon } from "@/components/icons/board-icon";

import { useEffect, useState } from "react";

export function CreateNewBoard({
  setShowDialog,
}: {
  setShowDialog: () => void;
}) {
  return (
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        "w-60 rounded-r-full dark:bg-transparent justify-start px-6 py-3.5 h-auto text-main-purple"
      )}
      href="#"
      onClick={(e) => {
        setShowDialog();
        e.preventDefault();
      }}
    >
      <BoardIcon fill="#635FC7" className="mr-3" />+ Create New Board
    </NavigationMenuLink>
  );
}
