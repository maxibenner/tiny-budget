"use client";

import AddItemButton from "@/components/add-item-button";
import { useData } from "@/context/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Category, Entry } from "@/types/data";
import { useMemo, useState } from "react";
import { MonthPicker } from "@/components/month-picker";

export default function Home() {
  const { data } = useData();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const items = useMemo(
    () =>
      data &&
      data.entries.map((element: Entry, i: number) => {
        const d = new Date(element.date);
        const formattedDate = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;

        // Get category name
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
      }),
    [data]
  );

  return (
    <main>
      <MonthPicker onValueChange={setSelectedMonth} />
      <Table className="mt-4">
        <TableBody>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
          {items}
        </TableBody>
      </Table>
      <AddItemButton />
    </main>
  );
}
