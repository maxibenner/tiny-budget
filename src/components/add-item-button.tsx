import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { DatePicker } from "./date-picker";
import { Category } from "@/types/data";
import { FormEvent, useState } from "react";
import { useData } from "@/context/data";

export default function AddItemButton() {
  const { data, addEntry } = useData();
  const [drawerActive, setDrawerActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  function handleNewEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const amount = formData.get("amount") as string;
    const date = formData.get("date") as string;

    addEntry({
      title,
      category,
      date,
      amount: parseInt(amount),
    });
    setDrawerActive(false);
  }
  return (
    <Drawer open={drawerActive} onOpenChange={setDrawerActive}>
      <DrawerTrigger asChild>
        <Button className="fixed shadow-md right-8 bottom-8 h-12">
          Add Item
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleNewEntry} className="p-8 flex flex-col gap-4">
          <DrawerTitle className="mb-4 text-xl">Add New Entry</DrawerTitle>
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
            <Label htmlFor="category">Category</Label>
            <Select required name="category">
              <SelectTrigger>Select</SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  {data &&
                    data.categories.map((category: Category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </SelectGroup>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="date">Date</Label>
            <Input
              required
              name="date"
              type="hidden"
              value={selectedDate && selectedDate.toISOString()}
            ></Input>
            <DatePicker onValueChange={setSelectedDate} />
          </div>
          <div>
            <Label htmlFor="amount">Price</Label>
            <Input required name="amount" id="amount" type="number"></Input>
          </div>
          <Button className="mt-6" type="submit">
            Add Entry
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
