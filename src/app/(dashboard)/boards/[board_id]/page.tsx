import { PlaceholderWithAction } from "@/components/common/placeholder-with-action";
import { db } from "@/lib/db";

export default async function Board({
  params,
}: {
  params: { board_id: string };
}) {
  const numericBoardId = Number.isNaN(+params.board_id) ? -1 : +params.board_id;
  const columns =
    await db`SELECT * FROM columns WHERE board_id=${numericBoardId}`;

  if (columns.length === 0)
    return (
      <PlaceholderWithAction
        onAdd={() => {}}
        onAddLabel="+Add New Column"
        text="This board is empty. Create a new column to get started."
      />
    );

  return <h1>hi</h1>;
}
