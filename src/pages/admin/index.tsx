"use client";
import { useEffect, useState } from "react";
import MenuTable from "./MenuTable";
import { IMenu } from "@/types/menu";
import supabase from "@/lib/db";
import DialogViewContent from "./DialogContent";
import Head from "next/head";

export default function AdminPage() {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");
      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }
      setMenus(data ?? []);
    };
    fetchMenus();
  }, []);

  const handleMenuAdded = (newMenus: IMenu[]) => {
    setMenus((prev) => [...newMenus, ...prev]);
  };

  const handleMenuUpdated = (updatedMenu: IMenu) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
    );
  };

  const handleMenuDeleted = (id: number) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Admin - Menu</title>
      </Head>

      <div className="mb-4 w-full flex justify-between">
        <div className="text-3xl font-bold">Menu</div>
        <DialogViewContent
          onMenuAdded={handleMenuAdded}
          onMenuUpdated={handleMenuUpdated}
          onMenuDeleted={handleMenuDeleted}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          deleteDialog={deleteDialog}
          setDeleteDialog={setDeleteDialog}
          updateDialog={updateDialog}
          setUpdateDialog={setUpdateDialog}
        />
      </div>

      <MenuTable
        menus={menus}
        setSelectedMenu={setSelectedMenu}
        setDeleteDialog={setDeleteDialog}
        setUpdateDialog={setUpdateDialog}
      />
    </div>
  );
}
