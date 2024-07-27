import { Column } from "@/components/board-details/column";
import { PlaceholderWithAction } from "@/components/common/placeholder-with-action";
import { setBoardId } from "@/data/server-context";
import { TColumn } from "@/data/types";
import { db } from "@/lib/db";

export default async function Board({
  params,
}: {
  params: { board_id: string };
}) {
  const numericBoardId = Number.isNaN(+params.board_id) ? -1 : +params.board_id;
  setBoardId(numericBoardId);

  const columns =
    (await db`SELECT * FROM columns WHERE board_id=${numericBoardId}`) as TColumn[];

  if (columns.length === 0)
    return (
      <PlaceholderWithAction
        onAdd={() => {}}
        onAddLabel="+Add New Column"
        text="This board is empty. Create a new column to get started."
      />
    );

  return (
    <div className="py-6 px-4">
      <ul>
        {columns.map((c) => {
          return <Column key={c.id} id={c.id} name={c.name} />;
        })}
      </ul>
    </div>
  );
}
