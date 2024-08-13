import moonIcon from "@/assets/moon.svg";
import sunIcon from "@/assets/sun.svg";
import { themeContext } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useContext(themeContext);

  console.log(setTheme);

  return (
    <div
      className={cn(
        "ml-6 flex justify-center gap-6 rounded-md bg-light-grey py-3.5 dark:bg-very-dark-grey",
        className,
      )}
    >
      <Image src={sunIcon} alt="light mode" />
      <button
        className={cn(
          "flex h-5 w-10 rounded-full bg-main-purple p-[3px]",
          theme === "light" ? "justify-start" : "justify-end",
        )}
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
      >
        <motion.div
          layout
          transition={{ duration: 0.15 }}
          className="size-3.5 rounded-full bg-white"
        />
      </button>
      <Image src={moonIcon} alt="dark node" />
    </div>
  );
}
