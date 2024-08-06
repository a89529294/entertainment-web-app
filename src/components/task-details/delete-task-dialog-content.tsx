import { DeleteDialogSubmitBtn } from "@/components/common/delete-dialog-submit-btn";
import { MyButton } from "@/components/common/my-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { textbodyL, textHeadingL } from "@/styles/custom-class-names";

export function DeleteTaskDialogContent({
  onDeleteTask,
  onCloseDialog,
  onCancel,
}: {
  onDeleteTask: () => Promise<void>;
  onCloseDialog: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <DialogHeader className="flex flex-col gap-6">
        <DialogTitle className={cn("text-left text-red", textHeadingL)}>
          Delete this task?
        </DialogTitle>
        <DialogDescription
          className={cn("text-left text-medium-grey", textbodyL)}
        >
          Are you sure you want to delete this task? This action will remove all
          subtasks and cannot be reversed.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <form action={onDeleteTask}>
          <DeleteDialogSubmitBtn closeDialog={onCloseDialog} />
        </form>

        <MyButton
          onClick={onCancel}
          type="button"
          size="short"
          variant="secondary"
        >
          Cancel
        </MyButton>
      </div>
    </div>
  );
}
