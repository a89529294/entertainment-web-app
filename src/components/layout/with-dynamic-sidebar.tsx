"use client";

import eyeSlash from "@/assets/eye-slash.svg";
import eye from "@/assets/eye.svg";
import horizontalThumb from "@/assets/horizontal-thumb.svg";
import kanbanBlack from "@/assets/kanban-black.svg";
import kanbanWhite from "@/assets/kanban-white.svg";
import verticalPipes from "@/assets/vertical-pipes.svg";
import { BoardSelectLinks } from "@/components/layout/board-select-link";
import { CreateNewBoard } from "@/components/layout/create-new-board";
import { NewBoardDialog } from "@/components/layout/new-board-dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { themeContext } from "@/contexts/theme-context";
import { TBoard } from "@/data/types";
import { useWindowWidth } from "@/hooks/use-window-width";
import { cn } from "@/lib/utils";
import { textHeadingM } from "@/styles/custom-class-names";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useContext, useState } from "react";

export function WithDynamicSidebar({
  header,
  children,
  boards,
}: {
  header: ReactNode;
  children: ReactNode;
  boards: TBoard[];
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const windowWidth = useWindowWidth();
  const { theme, setTheme } = useContext(themeContext);

  return (
    <div className="flex min-h-full flex-col bg-light-grey">
      <div className="flex">
        <div
          className={cn(
            "dark:border-line-dark hidden items-center justify-center gap-4 bg-white md:flex md:h-20 md:w-[260px] lg:h-24 lg:w-[300px] dark:bg-dark-grey",
          )}
        >
          <Image alt="logo" src={verticalPipes} />
          <Image
            alt="kanban"
            src={theme === "light" ? kanbanBlack : kanbanWhite}
          />
        </div>
        {header}
      </div>

      <div className={cn("flex flex-1")}>
        <motion.aside
          initial={{ width: 0, opacity: 0, translateX: "-100%" }}
          animate={{
            width: isSidebarOpen ? (windowWidth > 1023 ? "300px" : "260px") : 0,
            translateX: isSidebarOpen ? 0 : "-100%",
            opacity: isSidebarOpen ? "100%" : "0%",
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "hidden w-0 overflow-hidden bg-white pt-8 md:block dark:bg-dark-grey",
            isSidebarOpen && "relative",
          )}
        >
          <BoardSelectLinks boards={boards} />
          <NewBoardDialog
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            dialogTrigger={
              <CreateNewBoard
                useButtonAsWrapper
                setShowDialog={() => setShowDialog(true)}
              />
            }
          />
          <ThemeToggle className="absolute inset-x-3 bottom-28 ml-0 lg:inset-x-6" />
        </motion.aside>

        <div
          className={cn(
            "relative flex-1 transition-all dark:bg-very-dark-grey",
          )}
        >
          {children}
        </div>
      </div>

      {!isSidebarOpen ? (
        <button
          className="absolute bottom-12 left-0 hidden h-12 w-14 items-center justify-center md:flex"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Image
            alt="horizontal thumb"
            src={horizontalThumb}
            className="absolute inset-0"
          />
          <Image alt="eye" src={eye} className="relative" />
        </button>
      ) : (
        <motion.button
          initial={{ opacity: 0, translateX: "-100%" }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute bottom-16 left-6 hidden items-center gap-2.5 text-medium-grey md:flex",
            textHeadingM,
          )}
          onClick={() => setIsSidebarOpen(false)}
        >
          <Image alt="eyeSlash" src={eyeSlash} className="" />
          Hide Sidebar
        </motion.button>
      )}
    </div>
  );
}
