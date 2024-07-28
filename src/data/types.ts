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
