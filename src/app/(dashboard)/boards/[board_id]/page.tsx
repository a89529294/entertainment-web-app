import { AddColumnBlock } from "@/components/board-details/add-column-block";
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
    <div className="absolute inset-0 px-4 py-6">
      <ul
        id="horizontal-columns-container"
        className="flex h-full gap-6 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-main-purple"
      >
        {columns.map((c) => {
          return <Column key={c.id} id={c.id} name={c.name} />;
        })}

        <AddColumnBlock
          boardId={+params.board_id}
          columnsLength={columns.length}
        />
      </ul>
    </div>
  );
}
