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
import { Board } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BoardSelect({ boards }: { boards: Board[] }) {
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
      <NavigationMenu
        value={value}
        onValueChange={(v) => {
          setValue(v);
        }}
        viewportClassName={cn("top-9")}
      >
        <div
          className={cn(
            "fixed inset-0 top-16 bg-black/50 transition-opacity ",
            value && !showDialog ? "opacity-100" : "opacity-0"
          )}
        />

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
              className={cn(
                "py-4 pr-6 text-medium-grey rounded-lg",
                textHeadingM,
                showDialog && "p-0"
              )}
            >
              {showDialog ? (
                <NewBoardDialog
                  setValue={setValue}
                  setShowDialog={setShowDialog}
                  showDialog={showDialog}
                />
              ) : (
                <>
                  <BoardSelectLinks boards={boards} />
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
