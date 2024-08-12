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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrevValue } from "@/hooks/use-prev-value";
import { useUserId } from "@/hooks/use-user-id";
import { cn } from "@/lib/utils";
import { textHeadingL } from "@/styles/custom-class-names";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export function NewBoardDialog({
  showDialog,
  setShowDialog,
  setValue,
}: {
  showDialog: boolean;
  setShowDialog: (arg: boolean) => void;
  setValue: (arg: string) => void;
}) {
  const userId = useUserId();

  const [columns, setColumns] = useState([
    { id: crypto.randomUUID(), name: "" },
  ]);

  return (
    <Dialog
      open={showDialog}
      onOpenChange={(open) => {
        setTimeout(() => {
          setShowDialog(open);
        }, 100);
        !open && setValue("");
      }}
    >
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
              label="Board Name"
              nameSuffix="column"
              max={10}
              maxHeight="max-h-[248px]"
            />
          </div>
          {/* <MyButton type="submit" size="short" variant="primary">
            Create New Board
          </MyButton> */}
          <SubmitButton
            closeMenu={() => {
              requestIdleCallback(() => setShowDialog(false));
              setValue("");
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
