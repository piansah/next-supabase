import { IMenu } from "@/types/menu";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import MenuDropdown from "./MenuDropdown";

interface MenuTableRowProps {
  menu: IMenu;
  setSelectedMenu: (menu: IMenu) => void;
  setDeleteDialog: (open: boolean) => void;
  setUpdateDialog: (open: boolean) => void;
}

export default function MenuTableRow({
  menu,
  setSelectedMenu,
  setDeleteDialog,
  setUpdateDialog,
}: MenuTableRowProps) {
  return (
    <TableRow>
      <TableCell className="flex gap-3 items-center w-full">
        <Image
          src={menu.image}
          alt={menu.name}
          width={50}
          height={50}
          className="aspect-square object-cover rounded-lg"
        />
        {menu.name}
      </TableCell>
      <TableCell>
        {menu.description.split(" ").slice(0, 10).join(" ") + " ..."}
      </TableCell>
      <TableCell>{menu.category}</TableCell>
      <TableCell>${menu.price}.00</TableCell>
      <TableCell>
        <MenuDropdown
          menu={menu}
          onUpdateClick={(m) => {
            setSelectedMenu(m);
            setUpdateDialog(true);
          }}
          onDeleteClick={(m) => {
            setSelectedMenu(m);
            setDeleteDialog(true);
          }}
        />
      </TableCell>
    </TableRow>
  );
}
