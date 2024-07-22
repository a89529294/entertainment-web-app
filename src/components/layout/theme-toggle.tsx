import moonIcon from "@/assets/moon.svg";
import sunIcon from "@/assets/sun.svg";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");
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
  );
}
