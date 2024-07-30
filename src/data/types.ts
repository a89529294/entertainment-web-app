export type TBoard = {
  id: number;
  name: string;
  user_id: string;
};

export type TColumn = {
  id: number;
  board_id: number;
  name: string;
  sequence: number;
};

export type TColumnsWithTasks = {
  id: number;
  column_id: number;
  column_name: string;
  column_sequence: number;
  task_id: number;
  task_name: string;
  task_sequence: number;
  task_description: string;
};

export type TAggregatedColumnWithTasks = TColumn & {
  tasks: TTask[];
};

export type TTask = {
  id: number;
  column_id: number;
  name: string;
  description: string;
  sequence: number;
};

export type TSubtask = {
  id: number;
  task_id: number;
  name: string;
};
