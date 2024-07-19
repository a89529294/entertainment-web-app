export default function Board({ params }: { params: { board_id: string } }) {
  return <h1>{params.board_id}</h1>;
}
