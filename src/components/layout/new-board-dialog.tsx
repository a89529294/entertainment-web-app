import { addNewBoard } from "@/actions/board";
import grayX from "@/assets/gray-x.svg";
import { DynamicLengthInputs } from "@/components/common/board-task-column/dynamic-length-inputs";
import { MyButton } from "@/components/common/my-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrevValue } from "@/hooks/use-prev-value";
import { useUserId } from "@/hooks/use-user-id";
import { cn } from "@/lib/utils";
import { textHeadingL } from "@/styles/custom-class-names";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export function NewBoardDialog({
  showDialog,
  setShowDialog,
  onCloseDialog,
  dialogTrigger,
}: {
  showDialog: boolean;
  setShowDialog: (arg: boolean) => void;
  onCloseDialog?: () => void;
  dialogTrigger?: ReactNode;
}) {
  const userId = useUserId();

  return (
    <Dialog
      open={showDialog}
      onOpenChange={(open) => {
        setTimeout(() => {
          setShowDialog(open);
        }, 100);
        !open && onCloseDialog && onCloseDialog();
      }}
    >
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent className="gap-6 p-6">
        <DialogHeader>
          <DialogTitle className={cn("text-left", textHeadingL)}>
            Add New Board
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-6"
          action={userId ? addNewBoard.bind(null, userId) : undefined}
        >
          <Label className="space-y-2">
            <h3 className="text-xs font-bold text-medium-grey">Board Name</h3>
            <Input className="" name="name" />
          </Label>
          <div>
            <DynamicLengthInputs
              label="Column Name"
              nameSuffix="column"
              max={10}
              maxHeight="max-h-[248px]"
            />
          </div>

          <SubmitButton
            closeMenu={() => {
              requestIdleCallback(() => setShowDialog(false));
              onCloseDialog && onCloseDialog();
            }}
          />
        </form>
      </DialogContent>
      <DialogDescription />
    </Dialog>
  );
}

function SubmitButton({ closeMenu }: { closeMenu: () => void }) {
  const { pending } = useFormStatus();
  const prevPending = usePrevValue(pending);
  const isMount = useRef(true);

  useEffect(() => {
    prevPending && !pending && closeMenu();
  }, [pending, prevPending, closeMenu]);

  return (
    <MyButton type="submit" size="short" variant="primary" disabled={pending}>
      Create New Board
    </MyButton>
  );
}
