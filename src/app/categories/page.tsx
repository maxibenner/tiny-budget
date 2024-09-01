"use client";

import { Category, Entry } from "@/types/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../components/ui/table";
import { ReactNode, useMemo } from "react";
import { useData } from "@/context/data";
import AddCategoryButton from "@/components/add-category-button";

export default function Categories() {
  const { data } = useData();

  const categories: ReactNode = useMemo(
    () =>
      data &&
      data.categories.map((el: Category, i: number) => {
        return (
          <TableRow key={i}>
            <TableCell>{el.title}</TableCell>
            <TableCell>{el.amount}</TableCell>
          </TableRow>
        );
      }),
    [data]
  );

  return (
    <main>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
          {categories}
        </TableBody>
      </Table>
      <AddCategoryButton />
    </main>
  );
}
