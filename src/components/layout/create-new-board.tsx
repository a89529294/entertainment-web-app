import { BoardIcon } from "@/components/icons/board-icon";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from "react";

const CreateNewBoard = forwardRef<
  | "button"
  | ForwardRefExoticComponent<
      NavigationMenuLinkProps & RefAttributes<HTMLAnchorElement>
    >,
  {
    setShowDialog: () => void;
    useButtonAsWrapper?: boolean;
  }
>(function CreateNewBoard({ setShowDialog, useButtonAsWrapper }, ref) {
  const WrapperComponent = useButtonAsWrapper ? "button" : NavigationMenuLink;

  return (
    <WrapperComponent
      className={cn(
        navigationMenuTriggerStyle(),
        "h-auto w-60 justify-start rounded-r-full px-6 py-3.5 text-main-purple dark:bg-transparent",
      )}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setShowDialog();
      }}
    >
      <BoardIcon fill="#635FC7" className="mr-3" />+ Create New Board
    </WrapperComponent>
  );
});

export { CreateNewBoard };
