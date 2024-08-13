"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { BoardSelectLinks } from "@/components/layout/board-select-link";
import { CreateNewBoard } from "@/components/layout/create-new-board";
import { NewBoardDialog } from "@/components/layout/new-board-dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TBoard } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BoardSelect({ boards }: { boards: TBoard[] }) {
  const params = useParams();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const board = boards.find((b) => b.id.toString() === params.board_id);

  useEffect(() => {
    if (!board) router.replace("/");
  }, [board, router]);

  return (
    <>
      <h1 className="hidden text-xl font-bold md:block">{board?.name}</h1>
      <NavigationMenu
        value={value}
        onValueChange={(v) => {
          setValue(v);
        }}
        viewportClassName={cn("top-9")}
        className="block md:hidden"
      >
        {value && (
          <div
            className={cn(
              "fixed inset-0 top-16 bg-black/50 transition-opacity",
              value && !showDialog ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="h-auto w-40 p-0"
              onPointerEnter={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
              onPointerMove={(e) => e.preventDefault()}
            >
              {board?.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onPointerEnter={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
              className={cn(
                "rounded-lg py-4 pr-6 text-medium-grey",
                textHeadingM,
                showDialog && "p-0",
              )}
            >
              {showDialog ? (
                <NewBoardDialog
                  onCloseDialog={() => setValue("")}
                  setShowDialog={setShowDialog}
                  showDialog={showDialog}
                />
              ) : (
                <>
                  <BoardSelectLinks boards={boards} useNavigationMenuLink />
                  <CreateNewBoard setShowDialog={() => setShowDialog(true)} />
                  <ThemeToggle />
                </>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
