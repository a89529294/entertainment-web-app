import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { TBoard } from "@/data/types";
import { cn } from "@/lib/utils";
import { textBodyM } from "@/styles/custom-class-names";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BoardIcon } from "@/components/icons/board-icon";

export function BoardSelectLinks({ boards }: { boards: TBoard[] }) {
  const params = useParams();
  return (
    <>
      <p className={cn("px-6 pb-5", textBodyM)}>All BOARDS ({boards.length})</p>
      {boards.length
        ? boards.map((board) => {
            const isSelected = board.id.toString() === params.board_id;
            return (
              <Link
                key={board.id.toString()}
                href={`/boards/${board.id}`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-60 dark:bg-transparent rounded-r-full justify-start px-6 py-3.5 h-auto ",
                    isSelected &&
                      "bg-main-purple dark:bg-main-purple text-white hover:bg-main-purple/80 hover:text-accent-foreground focus:bg-main-purple/80 focus:text-accent-foreground focus:outline-none"
                  )}
                >
                  <BoardIcon
                    fill={isSelected ? "#fff" : "#828FA3"}
                    className="mr-3"
                  />
                  {board.name}
                </NavigationMenuLink>
              </Link>
            );
          })
        : null}
    </>
  );
}
