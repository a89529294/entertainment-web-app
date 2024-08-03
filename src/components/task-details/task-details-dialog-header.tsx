import { TripleDotsWithMenu } from "@/components/common/triple-dots-with-menu";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { textbodyL } from "@/styles/custom-class-names";

export function TaskDetailsDialogHeader({
  name,
  onDeleteTask,
}: {
  name: string;
  onDeleteTask: () => Promise<void>;
}) {
  return (
    <DialogHeader>
      <DialogTitle className="flex justify-between">
        {name}

        <TripleDotsWithMenu align="center">
          <div className="flex flex-col gap-4 p-4">
            <button className={cn("text-left text-medium-grey", textbodyL)}>
              Edit Task
            </button>

            <button className={cn("text-left text-red", textbodyL)}>
              Delete Task
            </button>
          </div>
        </TripleDotsWithMenu>
      </DialogTitle>
      <DialogDescription />
    </DialogHeader>
  );
}
