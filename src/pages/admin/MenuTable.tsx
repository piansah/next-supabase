import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MenuTableRow from "./MenuTableRow";
import { IMenu } from "@/types/menu";

interface MenuTableProps {
  menus: IMenu[];
}

export default function MenuTable({ menus }: MenuTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map((menu) => (
          <MenuTableRow key={menu.id} menu={menu} />
        ))}
      </TableBody>
    </Table>
  );
}
