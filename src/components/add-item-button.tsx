import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useData } from "@/context/data";
import { Category } from "@/types/data";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { DrawerTitle } from "./ui/drawer";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function AddItemButton() {
  const { data, addEntry } = useData();
  const [dialogActive, setDialogActive] = useState(false);
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
    setDialogActive(false);
  }
  return (
    <Dialog open={dialogActive} onOpenChange={setDialogActive}>
      <DialogTrigger asChild>
        <Button className="fixed shadow-md right-4 bottom-4 h-12">
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[100svh]">
        <form onSubmit={handleNewEntry} className="flex flex-col gap-4">
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
      </DialogContent>
    </Dialog>
  );
}
