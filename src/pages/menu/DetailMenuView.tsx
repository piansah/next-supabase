import type { IMenu } from "@/types/menu";
import MenuImage from "./MenuImage";
import { Button } from "@/components/ui/button";

interface Props {
  menu: IMenu;
}

export default function DetailMenuView({ menu }: Props) {
  return (
    <div className="flex gap-16 items-center w-full">
      <div className="w-1/2">
        <MenuImage src={menu.image} alt={menu.name} />
      </div>
      <div className="w-1/2">
        <h2 className="text-5xl font-bold mb-4">{menu.name}</h2>
        <p className="text-xl mb-4">{menu.description}</p>
        <div className="flex gap-4 items-center">
          <p className="text-4xl font-bold">${menu.price}</p>
          <Button className="text-lg py-6 font-bold size-lg bg-white text-black hover:bg-gray-200">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
