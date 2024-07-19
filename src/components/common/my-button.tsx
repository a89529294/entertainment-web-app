import { cn } from "@/lib/utils";

type MyButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: "primary" | "warning";
};

export function MyButton(props: MyButtonProps) {
  const variantsMap = {
    primary: {
      className: "bg-main-purple",
    },
    warning: {
      className: "",
    },
  } satisfies Record<MyButtonProps["variant"], any>;

  return (
    <button
      className={cn(
        "rounded-[20px] text-white font-bold px-4 py-3",
        variantsMap[props.variant].className
      )}
    >
      {props.children}
    </button>
  );
}
