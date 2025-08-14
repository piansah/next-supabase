"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { toast } from "sonner";

interface DialogViewContentProps {
  onMenuAdded: (newMenus: IMenu[]) => void;
  onMenuUpdated: (updatedMenu: IMenu) => void;
  onMenuDeleted: (id: number) => void;
  selectedMenu: IMenu | null;
  setSelectedMenu: (menu: IMenu | null) => void;
  deleteDialog: boolean;
  setDeleteDialog: (open: boolean) => void;
  updateDialog: boolean;
  setUpdateDialog: (open: boolean) => void;
}

export default function DialogViewContent({
  onMenuAdded,
  onMenuUpdated,
  onMenuDeleted,
  selectedMenu,
  setSelectedMenu,
  deleteDialog,
  setDeleteDialog,
  updateDialog,
  setUpdateDialog,
}: DialogViewContentProps) {
  const [createDialog, setCreateDialog] = useState(false);

  const handleAddMenu = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .insert(Object.fromEntries(formData))
        .select();

      if (error) throw error;
      if (data) onMenuAdded(data);

      toast.success("Menu added successfully!");
      setCreateDialog(false);
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const handleUpdateMenu = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMenu) return;
    const formData = new FormData(event.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .update(Object.fromEntries(formData))
        .eq("id", selectedMenu.id)
        .select();

      if (error) throw error;
      if (data && data.length > 0) onMenuUpdated(data[0]);

      toast.success("Menu updated successfully!");
      setUpdateDialog(false);
      setSelectedMenu(null);
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleDeleteMenu = async () => {
    if (!selectedMenu) return;
    try {
      const { error } = await supabase
        .from("menus")
        .delete()
        .eq("id", selectedMenu.id);

      if (error) throw error;

      onMenuDeleted(selectedMenu.id);
      toast.success("Menu deleted successfully!");
      setSelectedMenu(null);
      setDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <>
      {/* Add Menu */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogTrigger asChild>
          <Button className="font-bold">Add Menu</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleAddMenu} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Menu</DialogTitle>
              <DialogDescription className="text-center">
                Insert a new menu item
              </DialogDescription>
            </DialogHeader>
            <MenuForm />
            <DialogFooter className="flex gap-x-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Menu */}
      <Dialog
        open={updateDialog && !!selectedMenu}
        onOpenChange={setUpdateDialog}
      >
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleUpdateMenu} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Update Menu</DialogTitle>
              <DialogDescription className="text-center">
                Edit menu item details
              </DialogDescription>
            </DialogHeader>
            <MenuForm selectedMenu={selectedMenu} />
            <DialogFooter className="flex gap-x-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Menu */}
      <Dialog
        open={deleteDialog && !!selectedMenu}
        onOpenChange={setDeleteDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Menu</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete{" "}
              <strong>{selectedMenu?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-x-2">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDeleteMenu} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MenuForm({ selectedMenu }: { selectedMenu?: IMenu | null }) {
  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <input
          id="name"
          name="name"
          defaultValue={selectedMenu?.name}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="price">Price</Label>
        <input
          id="price"
          name="price"
          defaultValue={selectedMenu?.price}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <input
          id="description"
          name="description"
          defaultValue={selectedMenu?.description}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={selectedMenu?.category} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Coffee">Coffee</SelectItem>
              <SelectItem value="Tea">Tea</SelectItem>
              <SelectItem value="Juice">Juice</SelectItem>
              <SelectItem value="Non Coffee">Non Coffee</SelectItem>
              <SelectItem value="Pastries">Pastries</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="image">Image</Label>
        <input
          id="image"
          name="image"
          defaultValue={selectedMenu?.image}
          required
        />
      </div>
    </div>
  );
}
