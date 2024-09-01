import { useData } from "@/context/data";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";

export default function AddCategoryButton() {
  const { addCategory } = useData();
  const [drawerActive, setDrawerActive] = useState(false);

  function handleNewEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("title") as string;
    const amount = Number(formData.get("amount"));
    addCategory(name, amount);
    setDrawerActive(false);
  }

  return (
    <Drawer open={drawerActive} onOpenChange={setDrawerActive}>
      <DrawerTrigger asChild>
        <Button className="fixed shadow-md right-8 bottom-8 h-12">
          Add Category
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleNewEntry} className="p-8 flex flex-col gap-4">
          <DrawerTitle className="mb-4 text-xl">Add New Category</DrawerTitle>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              autoFocus
              required
              name="title"
              id="name"
              type="text"
            ></Input>
          </div>

          <div>
            <Label htmlFor="amount">Price</Label>
            <Input required name="amount" id="amount" type="number"></Input>
          </div>
          <Button className="mt-6" type="submit">
            Add Category
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
