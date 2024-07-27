"use client";

import { deleteBoard } from "@/actions/board";
import { useParams } from "next/navigation";

export function DeleteBoardBtn() {
  const params = useParams<{ board_id: string }>();
  const onDeleteBoard = deleteBoard.bind(null, Number(params.board_id));

  return (
    <form action={onDeleteBoard}>
      <button>Delete Board</button>
    </form>
  );
}
