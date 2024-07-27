"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addNewBoard(userId: string, formData: FormData) {
  let success = false;
  let boardId = "";

  try {
    const boards =
      await db`INSERT INTO boards (user_id, name) VALUES (${userId}, ${
        formData.get("boardName") as string
      }) RETURNING id`;
    boardId = boards[0].id;

    const columns = [] as {
      board_id: string;
      name: string;
      sequence: number;
    }[];
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (key.startsWith("columnName") && value) {
        columns.push({
          board_id: boardId,
          name: value as string,
          sequence: +key.split("-")[1],
        });
      }
    });

    if (columns.length) {
      await db`
      INSERT INTO columns ${db(columns, "board_id", "name", "sequence")} 
    `;
    }
    revalidateTag("boards");

    success = true;
  } catch (e) {
    console.log(e);
  }

  if (success) {
    // cookies().set("no-redirect-to-first-board", "");
    console.log("redirecting to", boardId);
    redirect(`/boards/${boardId}`);
  }
}

export async function deleteBoard(boardId: number, formData: FormData) {
  let success = false;
  try {
    console.log(boardId);
    await db`DELETE FROM boards WHERE id = ${boardId}`;

    revalidateTag("boards");

    success = true;
  } catch (e) {
    console.log(e);
  }

  if (success) {
    // cookies().set("no-redirect-to-first-board", "", { maxAge: 0 });
    redirect("/");
  }
}
