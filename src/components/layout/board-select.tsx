"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { Board } from "@/lib/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export function BoardSelect({ boards }: { boards: Board[] }) {
  const params = useParams();

  const board = boards.find((b) => b.id.toString() === params.board_id);

  return (
    <NavigationMenu onValueChange={(e) => console.log(e)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="w-40 p-0 h-auto "
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
            onPointerMove={(e) => e.preventDefault()}
          >
            {board?.name}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            {boards.length
              ? boards.map((board) => (
                  <Link
                    key={board.id.toString()}
                    href={`/boards/${board.id}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {board.name}
                    </NavigationMenuLink>
                  </Link>
                ))
              : null}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
