"use client";

import { BoardIcon } from "@/components/icons/board-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateNewBoard } from "@/components/layout/create-new-board";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Board } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  textBodyM,
  textHeadingL,
  textHeadingM,
} from "@/styles/custom-class-names";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
                <Dialog
                  open={showDialog}
                  onOpenChange={(open) => {
                    setTimeout(() => {
                      setShowDialog(open);
                    }, 1000);
                    !open && setValue("");
                  }}
                >
                  <DialogContent className="p-6 gap-6">
                    <DialogHeader>
                      <DialogTitle className={cn("text-left", textHeadingL)}>
                        Add New Board
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      <Label className="space-y-2 font-bold text-xs text-medium-grey">
                        <h3>Board Name</h3>
                        <Input className="" />
                      </Label>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  <p className={cn("px-6 pb-5", textBodyM)}>
                    All BOARDS ({boards.length})
                  </p>
                  {boards.length
                    ? boards.map((board) => {
                        const isSelected =
                          board.id.toString() === params.board_id;
                        return (
                          <Link
                            key={board.id.toString()}
                            href={`/boards/${board.id}`}
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "w-60 dark:bg-transparent rounded-r-full justify-start px-6 py-3.5 h-auto ",
                                isSelected &&
                                  "bg-main-purple dark:bg-main-purple text-white hover:bg-main-purple hover:text-white focus:bg-main-purple focus:text-white focus:outline-none"
                              )}
                            >
                              <BoardIcon
                                fill={isSelected ? "#fff" : "#828FA3"}
                                className="mr-3"
                              />
                              {board.name}
                            </NavigationMenuLink>
                          </Link>
                        );
                      })
                    : null}
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
