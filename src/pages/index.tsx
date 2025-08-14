import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/db";
import Image from "next/image";
import type { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <Card key={menu.id}>
            <CardContent>
              <Image
                src={menu.image}
                alt={menu.name}
                width={500}
                height={300}
                className="w-full h-[30vh] object-cover rounded-lg"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h4 className="font-semibold text-xl">{menu.name}</h4>
                  <p>{menu.category}</p>
                </div>
                <p className="font font-semibold text-2xl">${menu.price}</p>
              </div>
            </CardContent>
            <CardFooter>
             <Link href={`/menu/${menu.id}`} className="w-full">
               <Button className="w-full size-lg font-bold">Mau liat?</Button>
             </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
