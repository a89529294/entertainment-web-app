import { BoardIcon } from "@/components/icons/board-icon";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef, MouseEvent } from "react";

type ClickEvent = MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>;

function CreateNewBoard({
  setShowDialog,
  useButtonAsWrapper,
}: {
  setShowDialog: () => void;
  useButtonAsWrapper?: boolean;
}) {
  const WrapperComponent = useButtonAsWrapper ? "div" : NavigationMenuLink;

  return (
    <WrapperComponent
      className={cn(
        navigationMenuTriggerStyle(),
        "h-auto w-60 justify-start rounded-r-full px-6 py-3.5 text-main-purple dark:bg-transparent",
      )}
      href={useButtonAsWrapper ? undefined : "#"}
      onClick={(e) => {
        e.preventDefault();
        setShowDialog();
      }}
    >
      <BoardIcon fill="#635FC7" className="mr-3" />+ Create New Board
    </WrapperComponent>
  );
}

export { CreateNewBoard };
