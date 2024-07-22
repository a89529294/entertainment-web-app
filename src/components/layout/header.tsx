import logo from "@/assets/vertical-pipes.svg";

import { BoardSelect } from "@/components/layout/board-select";
import { HeaderTripleDotsMenu } from "@/components/layout/header-triple-dots-menu";
import { getUserBoards } from "@/data/get-boards";
import { getUser } from "@/data/get-user-else-redirect-to-login";
import Image from "next/image";

export async function Header() {
  const user = await getUser();
  const boards = user ? await getUserBoards(user.id) : [];

  return (
    <header className="bg-white px-4 py-5 flex gap-4 items-center sticky top-0 z-10 dark:bg-dark-grey">
      <Image alt="logo" src={logo} className="size-6" />
      <BoardSelect boards={boards} />

      <HeaderTripleDotsMenu />
    </header>
  );
}
