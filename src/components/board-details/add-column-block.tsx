"use client";

import { addNewColumn } from "@/actions/column";
import { BoardTaskColumnDialog } from "@/components/common/board-task-column/board-task-column-dialog";
import { NewBoardOrColumnForm } from "@/components/common/board-task-column/new-board-or-column-form";
import { cn } from "@/lib/utils";
import { textHeadingXL } from "@/styles/custom-class-names";
import { useEffect, useRef } from "react";

export function AddColumnBlock({
  boardId,
  columnsLength,
}: {
  boardId: string;
  columnsLength: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const onAddNewColumn = addNewColumn.bind(null, boardId, columnsLength);

  // for preventing columns container from scrolling to the right after adding a column
  useEffect(() => {
    if (ref.current) {
      ref.current.style.position = "absolute";
      ref.current.style.opacity = "0";

      setTimeout(() => {
        if (ref.current) {
          ref.current.style.position = "static";
          ref.current.style.opacity = "100";
        }
      }, 500);
    }
  }, [columnsLength]);

  return (
    <li
      ref={ref}
      className="grid w-72 shrink-0 place-items-center rounded-md bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA80]"
    >
      <BoardTaskColumnDialog
        trigger={
          <button className={cn("text-medium-grey", textHeadingXL)}>
            + New Column
          </button>
        }
        title="+Add New Column"
      >
        {(setClose) => {
          return (
            <NewBoardOrColumnForm
              closeDialog={() => {
                setClose();
              }}
              onAddNewEntity={onAddNewColumn}
              type={"column"}
            />
          );
        }}
      </BoardTaskColumnDialog>
    </li>
  );
}
