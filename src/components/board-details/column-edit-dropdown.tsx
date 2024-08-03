"use client";

import { deleteColumn } from "@/actions/column";
import tripleDots from "@/assets/triple-dots.svg";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { DeleteDialogSubmitBtn } from "@/components/common/delete-dialog-submit-btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { textbodyL } from "@/styles/custom-class-names";
import Image from "next/image";
import { useState } from "react";

export function ColumnEditDropdown({ id }: { id: string }) {
  const [showDialog, setShowDialog] = useState(false);
  const onDeleteColumn = deleteColumn.bind(null, id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto px-2">
        <Image alt="menu trigger" src={tripleDots} />
      </DropdownMenuTrigger>
      {showDialog ? (
        <DeleteDialog
          onDelete={onDeleteColumn}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          type="column"
        />
      ) : (
        <DropdownMenuContent align="end" className="mr-2 mt-2">
          <DropdownMenuItem className={`text-red ${textbodyL}`}>
            <button onClick={() => setShowDialog(true)}>Delete Column</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
