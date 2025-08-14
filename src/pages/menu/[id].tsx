import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { IMenu } from "@/types/menu";
import supabase from "@/lib/db";
import DetailMenuView from "./DetailMenuView";

export default function DetailMenuPage() {
  const router = useRouter();
  const [menu, setMenu] = useState<IMenu | null>(null);

  useEffect(() => {
    if (router.query.id) {
      const fetchMenu = async () => {
        const { data, error } = await supabase
          .from("menus")
          .select("*")
          .eq("id", router.query.id)
          .single();

        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }

        setMenu(data);
      };
      fetchMenu();
    }
  }, [router.query.id]);

  return (
    <div className="container mx-auto py-8">
      {menu && <DetailMenuView menu={menu} />}
    </div>
  );
}
