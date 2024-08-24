"use client";

import { DatePicker } from "@/components/create-entry";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/context/data";
import { Category, Entry } from "@/types/data";
import { FormEvent, useState } from "react";

export default function Home() {
  const { data, addEntry } = useData();
  const [drawerActive, setDrawerActive] = useState(false);

  function handleNewEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const amount = formData.get("amount") as string;

    // addEntry({ title, category, date, amount });
    setDrawerActive(false);
  }

  return (
    <main className="p-4">
      {/* <Tabs defaultValue="html">
        <TabsList>
          <TabsTrigger value="html">August</TabsTrigger>
          <TabsTrigger value="react">September</TabsTrigger>
        </TabsList>
        <TabsContent value="html"></TabsContent>
        <TabsContent value="react"></TabsContent>
      </Tabs> */}
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
          {data.entries.map((element: Entry, i) => {
            // Date
            const d = new Date(element.date);
            const formattedDate = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;

            // Category
            const category = data.categories.find(
              (category: Category) => category.id === element.category
            )?.title;

            return (
              <TableRow key={i}>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{element.title}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{element.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Drawer open={drawerActive} onOpenChange={setDrawerActive}>
        <DrawerTrigger asChild>
          <Button className="fixed shadow-md right-8 bottom-8 text-2xl w-12 h-12">
            +
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
              <Select name="category">
                <SelectTrigger>Select</SelectTrigger>
                <SelectGroup>
                  <SelectContent>
                    {data.categories.map((category: Category) => (
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
            <div>
              <Label htmlFor="date">Date</Label>
              {/*<Input
                required
                name="date"
                className="text-black"
                id="date"
                type="date"
              ></Input> */}
              <DatePicker />
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
    </main>
  );
}
