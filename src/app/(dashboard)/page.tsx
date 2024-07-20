import { redirect } from "next/navigation";

import { PlaceholderWithAction } from "@/components/common/placeholder-with-action";
import { getUserBoards } from "@/data/get-boards";
import { getUserElseRedirectToLogin } from "@/data/get-user-else-redirect-to-login";

export default async function Page() {
  const user = await getUserElseRedirectToLogin();
  const boards = await getUserBoards(user.id);

  if (boards.length) redirect(`/boards/${boards[0].id}`);

  return (
    <PlaceholderWithAction
      onAdd={() => {}}
      onAddLabel="+Add New Board"
      text="You don't have a board yet. Create a new board to get started."
    />
  );
}
