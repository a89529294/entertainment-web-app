"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function addNewBoard(userId: string, formData: FormData) {
  await new Promise((r) => setTimeout(r, 3000));
  const boards =
    await db`INSERT INTO boards (user_id, name) VALUES (${userId}, ${
      formData.get("boardName") as string
    }) RETURNING id`;
  const boardId = boards[0].id;

  const columns = [] as { board_id: string; name: string; sequence: number }[];
  Array.from(formData.entries()).forEach(([key, value]) => {
    if (key.startsWith("columnName")) {
      columns.push({
        board_id: boardId,
        name: value as string,
        sequence: +key.split("-")[1],
      });
    }
  });

  if (columns.length === 0) return;

  await db`
  INSERT INTO columns ${db(columns, "board_id", "name", "sequence")} 
`;

  revalidateTag("boards");

  return;
}
