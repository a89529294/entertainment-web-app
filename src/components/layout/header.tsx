import { logout } from "@/actions/auth";
import logo from "@/assets/vertical-pipes.svg";
import { TripleDotsWithMenu } from "@/components/common/triple-dots-with-menu";

import { BoardSelect } from "@/components/layout/board-select";
import { DeleteBoardBtn } from "@/components/layout/delete-board-btn";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getUserBoards } from "@/data/get-boards";
import { getUser } from "@/data/get-user-else-redirect-to-login";
import { textbodyL } from "@/styles/custom-class-names";
import Image from "next/image";

export async function Header() {
  const user = await getUser();
  const boards = user ? await getUserBoards(user.id) : [];

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 bg-white px-4 py-5 dark:bg-dark-grey">
      <Image alt="logo" src={logo} className="size-6" />
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
