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
  setSelectedMenu: (menu: IMenu) => void;
  setDeleteDialog: (open: boolean) => void;
  setUpdateDialog: (open: boolean) => void;
}

export default function MenuTable({
  menus,
  setSelectedMenu,
  setDeleteDialog,
  setUpdateDialog,
}: MenuTableProps) {
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
          <MenuTableRow
            key={menu.id}
            menu={menu}
            setSelectedMenu={setSelectedMenu}
            setDeleteDialog={setDeleteDialog}
            setUpdateDialog={setUpdateDialog}
          />
        ))}
      </TableBody>
    </Table>
  );
}