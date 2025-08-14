import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IMenu } from "@/types/menu";

interface MenuDropdownProps {
  menu: IMenu;
  onDeleteClick: (menu: IMenu) => void;
  onUpdateClick: (menu: IMenu) => void;
}

export default function MenuDropdown({
  menu,
  onDeleteClick,
  onUpdateClick,
}: MenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-58">
        <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onUpdateClick(menu)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDeleteClick(menu)}
            className="text-red-400"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
