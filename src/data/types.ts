type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TBoard = {
  id: string;
  name: string;
  user_id: string;
};

export type TColumn = {
  id: string;
  board_id: string;
  name: string;
  sequence: number;
};

export type TColumnsWithTasks = {
  id: string;
  column_id: string;
  column_name: string;
  column_sequence: number;
  task_id: string;
  task_name: string;
  task_sequence: number;
  task_description: string;
  task_status: TaskStatus;
};

export type TAggregatedColumnWithTasks = TColumn & {
  tasks: TTask[];
};

export type TTask = {
  id: string;
  column_id: string;
  name: string;
  description?: string;
  sequence: number;
  status: "todo" | "doing" | "done";
};

export type NewTask = Optional<TTask, "id" | "status">;

export type TaskStatus = TTask["status"];

export type TSubtask = {
  id: string;
  task_id: string;
  name: string;
  sequence: number;
  completed: boolean;
};

export type Entity = "board" | "column" | "task";

export type DialogState = "delete" | "edit" | "view";
