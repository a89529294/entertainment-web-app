import { logout } from "@/actions/auth";
import tripleDots from "@/assets/triple-dots.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { textbodyL } from "@/styles/custom-class-names";
import Image from "next/image";

export function HeaderTripleDotsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto">
        <Image alt="menu trigger" src={tripleDots} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5 mr-4 ">
        <DropdownMenuItem className={`text-red ${textbodyL}`}>
          Delete Board
        </DropdownMenuItem>
        <DropdownMenuItem className={`text-medium-grey ${textbodyL}`}>
          <form action={logout}>
            <button>Log Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
