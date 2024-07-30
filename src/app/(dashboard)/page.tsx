import { redirect } from "next/navigation";

import { AddNewBoardOrColumn } from "@/components/common/add-new-board-or-column";
import { getUserBoards } from "@/data/get-boards";
import { getUserElseRedirectToLogin } from "@/data/get-user-else-redirect-to-login";

export default async function Page() {
  const user = await getUserElseRedirectToLogin();
  const boards = await getUserBoards(user.id);

  if (boards.length) redirect(`/boards/${boards[0].id}/${boards[0].name}`);

  return <AddNewBoardOrColumn type="board" userId={user.id} />;
}
