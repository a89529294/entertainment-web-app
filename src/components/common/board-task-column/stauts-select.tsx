import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import { textHeadingS } from "@/styles/custom-class-names";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function StatusSelect({
  setBtnDisabled,
  taskId,
  serverStatus,
}: {
  setBtnDisabled?: (v: boolean) => void;
  taskId?: string;
  serverStatus?: TaskStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<TaskStatus>(serverStatus ?? "todo");
  const [timerId, setTimerId] = useState<number>(0);

  useEffect(() => {
    if (serverStatus) setStatus(serverStatus);
  }, [serverStatus]);

  return (
    <div>
      <h2 className={cn(textHeadingS, "mb-2 tracking-normal text-medium-grey")}>
        Current Status
      </h2>

      <Select
        onOpenChange={(v) => {
          if (setBtnDisabled) {
            if (v) {
              window.clearTimeout(timerId);
              setBtnDisabled(true);
            } else {
              const timerId = window.setTimeout(() => {
                setBtnDisabled(false);
              }, 200);
              setTimerId(timerId);
            }
          }
        }}
        value={status}
        onValueChange={(newStatus) => {
          if (taskId && newStatus) {
            setStatus(newStatus as TaskStatus);
            if (!setBtnDisabled)
              fetch(`/api/task-status/${taskId}/${newStatus}`, {
                method: "POST",
              }).then(() => router.refresh());
          }
        }}
      >
        <SelectTrigger className="w-full">
          <span className="capitalize">{status}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="pl-3" value="todo">
            Todo
          </SelectItem>
          <SelectItem className="pl-3" value="doing">
            Doing
          </SelectItem>
          <SelectItem className="pl-3" value="done">
            Done
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
