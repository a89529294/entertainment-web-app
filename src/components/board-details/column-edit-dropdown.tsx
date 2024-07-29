"use client";

import { deleteColumn } from "@/actions/column";
import tripleDots from "@/assets/triple-dots.svg";
import { ColumnEditDropdownSubmitBtn } from "@/components/board-details/column-edit-dropdown-submit-btn";
import { MyButton } from "@/components/common/my-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { textbodyL, textHeadingL } from "@/styles/custom-class-names";
import Image from "next/image";
import { RefObject, useState } from "react";

export function ColumnEditDropdown({ id }: { id: number }) {
  const [showDialog, setShowDialog] = useState(false);
  const onDeleteColumn = deleteColumn.bind(null, id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto px-2">
        <Image alt="menu trigger" src={tripleDots} />
      </DropdownMenuTrigger>
      {showDialog ? (
        <Dialog
          open={showDialog}
          onOpenChange={(v) => {
            console.log(v);
            setShowDialog(v);
          }}
        >
          <DialogContent className="flex flex-col gap-6 p-8 pb-10">
            <DialogHeader className="flex flex-col gap-6">
              <DialogTitle className={cn("text-left text-red", textHeadingL)}>
                Delete this column?
              </DialogTitle>
              <DialogDescription
                className={cn("text-left text-medium-grey", textbodyL)}
              >
                Are you sure you want to delete the xxx column? This action will
                remove all tasks and cannot be reversed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-4">
              <form action={onDeleteColumn}>
                <ColumnEditDropdownSubmitBtn
                  closeDialog={() => setShowDialog(false)}
                />
              </form>

              <DialogClose asChild>
                <MyButton type="button" size="short" variant="secondary">
                  Cancel
                </MyButton>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
