import { DragAndDropArea } from "@/components/board-details/drag-and-drop-area";
import { AddNewBoardOrColumn } from "@/components/common/add-new-board-or-column";
import { getColumnsAndTasksForBoard } from "@/data/get-columns-for-board";
import { TAggregatedColumnWithTasks } from "@/data/types";

export default async function Board({
  params,
}: {
  params: { board_id: string; board_name: string };
}) {
  const columns = await getColumnsAndTasksForBoard(params.board_id);

  const uniqueColumns = {} as Record<string, TAggregatedColumnWithTasks>;

  columns.forEach((c) => {
    const foundColumn = c.column_id in uniqueColumns;
    if (foundColumn) {
      uniqueColumns[c.column_id] = {
        ...uniqueColumns[c.column_id],
        tasks: c.task_id
          ? [
              ...uniqueColumns[c.column_id].tasks,
              {
                id: c.task_id,
                name: c.task_name,
                column_id: c.column_id,
                description: c.task_description,
                sequence: c.task_sequence,
                status: c.task_status,
              },
            ]
          : [...uniqueColumns[c.column_id].tasks],
      };
    } else {
      uniqueColumns[c.column_id] = {
        id: c.column_id,
        name: c.column_name,
        sequence: c.column_sequence,
        board_id: params.board_id,
        tasks: c.task_id
          ? [
              {
                id: c.task_id,
                name: c.task_name,
                sequence: c.task_sequence,
                column_id: c.column_id,
                description: c.task_description,
                status: c.task_status,
              },
            ]
          : [],
      };
    }
  });

  if (columns.length === 0)
    return <AddNewBoardOrColumn type="column" boardId={params.board_id} />;

  return (
    <div className="absolute inset-0 px-4 py-6">
      <DragAndDropArea
        serverColumns={uniqueColumns}
        boardId={params.board_id}
        boardName={params.board_name}
      />
    </div>
  );
}
