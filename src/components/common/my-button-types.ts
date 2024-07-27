import { cn } from "@/lib/utils";

export type MyButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: "primary" | "warning" | "secondary";
  size: "tall" | "short";
};

export const variantsMap = {
  primary: {
    className:
      "bg-main-purple hover:bg-main-purple-hover disabled:hover:bg-main-purple",
  },
  warning: {
    className: "",
  },
  secondary: {
    className:
      "bg-main-purple/10 text-main-purple w-full hover:bg-main-purple/25 disabled:hover:bg-main-purple/10 ",
  },
} satisfies Record<MyButtonProps["variant"], any>;

export const sizesMap = {
  tall: {
    className: "h-12",
  },
  short: {
    className: "h-10",
  },
} satisfies Record<MyButtonProps["size"], any>;

export const myButtonCN = (
  variant: MyButtonProps["variant"],
  size: MyButtonProps["size"]
) =>
  cn(
    "rounded-[20px] text-white font-bold px-4 items-center transition-transform active:translate-y-1 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:opacity-50 ",
    variantsMap[variant].className,
    sizesMap[size].className
  );
