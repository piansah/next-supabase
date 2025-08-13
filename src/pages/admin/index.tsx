"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MenuTable from "./MenuTable";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";

export default function AdminPage() {
  const [menus, setMenus] = useState<IMenu[]>([]);

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

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <div className="text-3xl font-bold">Menu</div>
        <Button className="font-bold">Add Menu</Button>
      </div>
      <MenuTable menus={menus} />
    </div>
  );
}
