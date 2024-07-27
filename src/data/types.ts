export type Board = {
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
