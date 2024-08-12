"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState } from "react";
import verticalPipes from "@/assets/vertical-pipes.svg";
import kanban from "@/assets/kanban.svg";
import { motion } from "framer-motion";
import { BoardSelectLinks } from "@/components/layout/board-select-link";
import { CreateNewBoard } from "@/components/layout/create-new-board";
import { TBoard } from "@/data/types";
import { BoardSelect } from "@/components/layout/board-select";
import { textBodyM, textHeadingM } from "@/styles/custom-class-names";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BoardIcon } from "@/components/icons/board-icon";
import horizontalThumb from "@/assets/horizontal-thumb.svg";
import eye from "@/assets/eye.svg";
import eyeSlash from "@/assets/eye-slash.svg";

export function WithDynamicSidebar({
  header,
  children,
  boards,
}: {
  header: ReactNode;
  children: ReactNode;
  boards: TBoard[];
}) {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="flex min-h-full flex-col bg-light-grey">
      <div className="flex">
        <div
          className={cn(
            "dark:border-line-dark hidden items-center justify-center gap-4 bg-white md:flex md:h-20 md:w-[260px] lg:h-24",
          )}
        >
          <Image alt="logo" src={verticalPipes} />
          <Image alt="kanban" src={kanban} />
        </div>
        {header}
      </div>

      <div className={cn("flex flex-1")}>
        <motion.aside
          initial={{ width: 0, opacity: 0, translateX: "-100%" }}
          animate={{
            width: isSidebarOpen ? "260px" : 0,
            translateX: isSidebarOpen ? 0 : "-100%",
            opacity: isSidebarOpen ? "100%" : "0%",
          }}
          transition={{ duration: 0.15 }}
          className={cn(
            "hidden w-0 overflow-hidden bg-white pt-8 md:block",
            isSidebarOpen && "relative",
          )}
        >
          <BoardSelectLinks boards={boards} />
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
          className="absolute bottom-12 left-0 flex h-12 w-14 items-center justify-center"
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
            "absolute bottom-16 left-6 flex items-center gap-2.5 text-medium-grey",
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
