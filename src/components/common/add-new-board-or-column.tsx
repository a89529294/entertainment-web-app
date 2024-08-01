"use client";

import { addNewBoard } from "@/actions/board";
import { addNewColumn } from "@/actions/column";
import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { NewBoardOrColumnForm } from "@/components/common/board-task-column/new-board-or-column-form";
import { myButtonCN } from "@/components/common/my-button-types";
import { ReactElement } from "react";

const texts = {
  board: {
    btnLabel: "+Add New Board",
    description:
      "You don't have a board yet. Create a new board to get started.",
    dialogTitle: "Add New Board",
  },
  column: {
    description: "This board is empty. Create a new column to get started.",
    btnLabel: "+Add New Column",
    dialogTitle: "Add New Column",
  },
};

export function AddNewBoardOrColumn({
  type,
  boardId,
}: {
  type: "column";
  boardId: string;
}): ReactElement;
export function AddNewBoardOrColumn({
  type,
  userId,
}: {
  type: "board";
  userId: string;
}): ReactElement;
export function AddNewBoardOrColumn({
  type,
  boardId,
  userId,
}: {
  type: keyof typeof texts;
  boardId?: string;
  userId?: string;
}) {
  const onAddNewEntity =
    type === "column"
      ? addNewColumn.bind(null, boardId ?? "", 0)
      : addNewBoard.bind(null, userId ?? "");

  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-6">
        <p className="px-10 text-center text-lg font-bold text-medium-grey">
          {texts[type].description}
        </p>

        <BoardTaskColumnDialog
          trigger={
            <button className={myButtonCN("primary", "tall")}>
              {texts[type].btnLabel}
            </button>
          }
          title={texts[type].dialogTitle}
        >
          {(setClose) => {
            return (
              <NewBoardOrColumnForm
                closeDialog={() => setClose()}
                onAddNewEntity={onAddNewEntity}
                type={type}
              />
            );
          }}
        </BoardTaskColumnDialog>
      </div>
    </div>
  );
}
