import { Column } from "@/components/board-details/column";
import { AddNewBoardOrColumn } from "@/components/common/add-new-board-or-column";
import { getColumnsForBoard } from "@/data/get-columns-for-board";

export default async function Board({
  params,
}: {
  params: { board_id: string };
}) {
  const numericBoardId = Number.isNaN(+params.board_id) ? -1 : +params.board_id;

  const columns = await getColumnsForBoard(numericBoardId);

  if (columns.length === 0)
    return <AddNewBoardOrColumn type="column" boardId={numericBoardId} />;

  return (
    <div className="py-6 px-4 absolute inset-0">
      <ul className="h-full flex gap-6">
        {columns.map((c) => {
          return <Column key={c.id} id={c.id} name={c.name} />;
        })}
      </ul>
    </div>
  );
}
