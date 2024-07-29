"use client";

import { deleteBoard } from "@/actions/board";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function DeleteColumnBtn() {
  const params = useParams<{ board_id: string }>();
  const onDeleteBoard = deleteBoard.bind(null, Number(params.board_id));

  return (
    <form>
      <Dialog>
        <DialogTrigger
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete Column
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  );
}
