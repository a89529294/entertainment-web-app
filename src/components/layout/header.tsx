import { logout } from "@/actions/auth";
import logo from "@/assets/vertical-pipes.svg";
import { TripleDotsWithMenu } from "@/components/common/triple-dots-with-menu";

import { BoardSelect } from "@/components/layout/board-select";
import { DeleteBoardBtn } from "@/components/layout/delete-board-btn";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TBoard } from "@/data/types";
import { cn } from "@/lib/utils";
import { textbodyL } from "@/styles/custom-class-names";
import Image from "next/image";

export async function Header({
  className,
  boards,
}: {
  className?: string;
  boards: TBoard[];
}) {
  return (
    <header
      className={cn(
        "md:border-line-light dark:md:border-line-dark flex h-16 flex-1 items-center gap-4 bg-white px-4 md:h-20 md:border-b md:border-l lg:h-24 dark:bg-dark-grey",
        className,
      )}
    >
      <Image alt="logo" src={logo} className="block size-6 md:hidden" />
      <BoardSelect boards={boards} />

      <TripleDotsWithMenu triggerClassName="ml-auto" menuClassName="mt-5">
        <DropdownMenuItem className={`text-red ${textbodyL}`}>
          <DeleteBoardBtn />
        </DropdownMenuItem>
        <DropdownMenuItem className={`text-medium-grey ${textbodyL}`}>
          <form action={logout}>
            <button>Log Out</button>
          </form>
        </DropdownMenuItem>
      </TripleDotsWithMenu>
    </header>
  );
}
