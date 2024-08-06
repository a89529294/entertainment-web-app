import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { textHeadingS } from "@/styles/custom-class-names";

export function StatusSelect() {
  return (
    <div>
      <h2 className={cn(textHeadingS, "mb-2 tracking-normal text-medium-grey")}>
        Current Status
      </h2>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="pl-3" value="Todo">
            Todo
          </SelectItem>
          <SelectItem className="pl-3" value="Doing">
            Doing
          </SelectItem>
          <SelectItem className="pl-3" value="Done">
            Done
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
