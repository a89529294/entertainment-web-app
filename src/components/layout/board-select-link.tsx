import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { TBoard } from "@/data/types";
import { cn } from "@/lib/utils";
import { textBodyM, textHeadingM } from "@/styles/custom-class-names";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BoardIcon } from "@/components/icons/board-icon";

export function BoardSelectLinks({
  boards,
  useNavigationMenuLink,
}: {
  boards: TBoard[];
  useNavigationMenuLink?: boolean;
}) {
  const params = useParams();

  const LinkComponent = useNavigationMenuLink ? NavigationMenuLink : "div";
  return (
    <>
      <p
        className={cn(
          "whitespace-nowrap px-6 pb-5 tracking-[2.4px] text-medium-grey",
          textBodyM,
        )}
      >
        All BOARDS ({boards.length})
      </p>
      {boards.length
        ? boards.map((board) => {
            const isSelected = board.id.toString() === params.board_id;
            return (
              <Link
                key={board.id.toString()}
                href={`/boards/${board.id}/${board.name}`}
                legacyBehavior={useNavigationMenuLink}
                passHref={useNavigationMenuLink}
              >
                <LinkComponent
                  className={cn(
                    useNavigationMenuLink
                      ? navigationMenuTriggerStyle()
                      : "flex items-center",
                    "h-auto w-60 justify-start rounded-r-full px-6 py-3.5 text-medium-grey dark:bg-transparent",
                    isSelected &&
                      "bg-main-purple text-white hover:bg-main-purple/80 hover:text-accent-foreground focus:bg-main-purple/80 focus:text-accent-foreground focus:outline-none dark:bg-main-purple",
                    textHeadingM,
                  )}
                >
                  <BoardIcon
                    fill={isSelected ? "#fff" : "#828FA3"}
                    className="mr-3"
                  />
                  {board.name}
                </LinkComponent>
              </Link>
            );
          })
        : null}
    </>
  );
}
