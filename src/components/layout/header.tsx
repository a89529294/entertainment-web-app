import logo from "@/assets/logo-32.png";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/db";
import { getUserElseRedirectToLogin } from "@/components/auth/get-user-else-redirect-to-login";
import { BoardSelect } from "@/components/layout/board-select";
import { Board } from "@/lib/types";

export async function Header() {
  const user = await getUserElseRedirectToLogin();
  const boards =
    (await db`SELECT * FROM boards WHERE user_id=${user.id}`) as Board[];

  return (
    <header className="bg-white px-4 py-5 flex gap-4 items-center sticky top-0 z-10">
      <Image alt="logo" src={logo} className="size-6" />
      <BoardSelect boards={boards} />
    </header>
  );
}
