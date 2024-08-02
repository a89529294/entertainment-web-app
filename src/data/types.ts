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
};

export type TAggregatedColumnWithTasks = TColumn & {
  tasks: TTask[];
};

export type TTask = {
  id: string;
  column_id: string;
  name: string;
  description: string;
  sequence: number;
};

export type TSubtask = {
  id: string;
  task_id: string;
  name: string;
  sequence: number;
  completed: boolean;
};
