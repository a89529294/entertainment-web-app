"use server";

import { TColumn, TTask } from "@/data/types";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function addNewColumn(
  boardId: string,
  sequence: number,
  formData: FormData,
) {
  console.log(boardId, formData);
  const name = (formData.get("name") as string).trim();

  const columns =
    await db`INSERT INTO columns (board_id, name, sequence) VALUES (${boardId}, ${name}, ${sequence}) RETURNING id`;

  const columnId = columns[0].id;

  const tasks = [] as Omit<TTask, "id" | "description">[];

  Array.from(formData.entries()).forEach(([key, value], idx) => {
    const trimmedValue = value.toString().trim();
    if (key.startsWith("task") && trimmedValue)
      tasks.push({
        column_id: columnId,
        name: trimmedValue as string,
        sequence: +key.split("-")[1],
      });
  });

  if (tasks.length) {
    await db`
    INSERT INTO tasks ${db(tasks, "column_id", "name", "sequence")} 
  `;
  }

  revalidateTag("columns-with-tasks");
}

export async function deleteColumn(columnId: string) {
  try {
    await db`DELETE FROM columns WHERE id = ${columnId}`;

    revalidateTag("columns-with-tasks");
  } catch (e) {
    console.log(e);
  }
}
