import supabase from "@/lib/db";
import type { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";

export default function Home() {
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      console.log("Fetching menus...");

      const { data, error } = await supabase.from("menus").select("*");

      console.log("Raw response:", { data, error });

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      setMenus(data ?? []);
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <h1>Menus</h1>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            {menu.name} - {menu.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
