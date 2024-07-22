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

import { Board } from "@/data/types";
import { cn } from "@/lib/utils";
import { textBodyM, textHeadingM } from "@/styles/custom-class-names";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sunIcon from "@/assets/sun.svg";
import moonIcon from "@/assets/moon.svg";
import { motion } from "framer-motion";

export function BoardSelect({ boards }: { boards: Board[] }) {
  const params = useParams();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const board = boards.find((b) => b.id.toString() === params.board_id);

  useEffect(() => {
    if (!board) router.replace("/");
  }, [board, router]);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <NavigationMenu
      value={value}
      onValueChange={setValue}
      viewportClassName="top-9"
    >
      <div
        className={cn(
          "fixed inset-0 top-16 bg-black/50 transition-opacity ",
          value ? "opacity-100" : "opacity-0"
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
              textHeadingM
            )}
          >
            <p className={cn("px-6 pb-5", textBodyM)}>
              All BOARDS ({boards.length})
            </p>
            {boards.length
              ? boards.map((board) => {
                  const isSelected = board.id.toString() === params.board_id;
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

            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "w-60 rounded-r-full dark:bg-transparent justify-start px-6 py-3.5 h-auto text-main-purple"
              )}
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <BoardIcon fill="#635FC7" className="mr-3" />+ Create New Board
            </NavigationMenuLink>

            <div className="ml-6 gap-6 flex justify-center py-3.5 bg-light-grey dark:bg-dark-grey">
              <Image src={sunIcon} alt="light mode" />
              <button
                className={cn(
                  "h-5 flex bg-main-purple w-10 p-[3px] rounded-full",
                  mode === "light" ? "justify-start" : "justify-end"
                )}
                onClick={() => {
                  const newMode = mode === "light" ? "dark" : "light";
                  setMode(newMode);

                  if (newMode === "dark") {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                  }
                }}
              >
                <motion.div
                  layout
                  transition={{ duration: 0.15 }}
                  className="size-3.5 bg-white rounded-full"
                />
              </button>
              <Image src={moonIcon} alt="dark node" />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
