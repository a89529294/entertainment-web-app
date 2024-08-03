import { DeleteDialogSubmitBtn } from "@/components/common/delete-dialog-submit-btn";
import { MyButton } from "@/components/common/my-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Entity } from "@/data/types";
import { cn } from "@/lib/utils";
import { textbodyL, textHeadingL } from "@/styles/custom-class-names";

const typeMap = {
  board: {
    title: "Delete this board?",
    description:
      "Are you sure you want to delete this board? This action will remove all tasks and cannot be reversed.",
  },
  column: {
    title: "Delete this column?",
    description:
      "Are you sure you want to delete this column? This action will remove all tasks and cannot be reversed.",
  },
  task: {
    title: "Delete this task?",
    description:
      "Are you sure you want to delete this task? This action will remove all subtasks and cannot be reversed.",
  },
};

export function DeleteDialog({
  onDelete,
  showDialog,
  setShowDialog,
  type,
}: {
  onDelete: () => Promise<void>;
  showDialog: boolean;
  setShowDialog: (arg: boolean) => void;
  type: Entity;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={(v) => {
        setShowDialog(v);
      }}
    >
      <DialogContent className="flex flex-col gap-6 p-8 pb-10">
        <DialogHeader className="flex flex-col gap-6">
          <DialogTitle className={cn("text-left text-red", textHeadingL)}>
            {typeMap[type].title}
          </DialogTitle>
          <DialogDescription
            className={cn("text-left text-medium-grey", textbodyL)}
          >
            {typeMap[type].description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <form action={onDelete}>
            <DeleteDialogSubmitBtn closeDialog={() => setShowDialog(false)} />
          </form>

          <DialogClose asChild>
            <MyButton type="button" size="short" variant="secondary">
              Cancel
            </MyButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
