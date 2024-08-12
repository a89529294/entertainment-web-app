import { cn } from "@/lib/utils";
import { textbodyL, textHeadingM } from "@/styles/custom-class-names";
import { ComponentPropsWithRef } from "react";

export type MyButtonProps = ComponentPropsWithRef<"button"> & {
  variant: "primary" | "destructive" | "secondary";
  size: "tall" | "short";
};

export const variantsMap = {
  primary: {
    className:
      "bg-main-purple hover:bg-main-purple-hover disabled:hover:bg-main-purple",
  },
  destructive: {
    className: "bg-red hover:bg-red-hover disabled:hover:bg-red",
  },
  secondary: {
    className:
      "bg-main-purple/10 dark:bg-white text-main-purple hover:bg-main-purple/25 disabled:hover:bg-main-purple/10 ",
  },
} satisfies Record<MyButtonProps["variant"], any>;

export const sizesMap = {
  tall: {
    className: cn("h-12", textHeadingM),
  },
  short: {
    className: cn("h-10", textbodyL),
  },
} satisfies Record<MyButtonProps["size"], any>;

export const myButtonCN = (
  variant: MyButtonProps["variant"],
  size: MyButtonProps["size"],
) =>
  cn(
    "rounded-[20px] text-white font-bold px-4 items-center transition-transform active:translate-y-1 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:opacity-50 ",
    variantsMap[variant].className,
    sizesMap[size].className,
  );
