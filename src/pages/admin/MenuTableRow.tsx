import { IMenu } from "@/types/menu";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import MenuDropdown from "./MenuDropdown";

interface MenuTableRowProps {
  menu: IMenu;
}

export default function MenuTableRow({ menu }: MenuTableRowProps) {
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
        <MenuDropdown />
      </TableCell>
    </TableRow>
  );
}
