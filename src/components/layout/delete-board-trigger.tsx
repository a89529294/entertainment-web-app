"use client";

import { deleteBoard } from "@/actions/board";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { useParams } from "next/navigation";
import { useState } from "react";

export function DeleteBoardTrigger({
  displayDeleteBoardDialog,
}: {
  displayDeleteBoardDialog: () => void;
}) {
  return (
    <button onClick={() => displayDeleteBoardDialog()}>Delete Board</button>
  );
}
