"use client";

import { createContext, ReactNode, useContext } from "react";
import { Data } from "@/lib/data";
import { AppData, Category, Entry, General } from "@/types/data";

type DataProviderProps = {
  children: ReactNode;
};

type DataContextType = {
  data: AppData;
  updateGeneral: (general: General) => void;
  addCategory: (title: string) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, title: string) => void;
  addEntry: (entry: Entry) => void;
  deleteEntry: (id: number) => void;
  updateEntry: (id: number, entry: Entry) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: DataProviderProps) {
  const data = new Data();

  function updateGeneral(general: General) {
    data.updateGeneral(general);
  }

  function addCategory(title: string) {
    data.addCategory(title);
  }

  function deleteCategory(id: string) {
    data.deleteCategory(id);
  }

  function updateCategory(id: string, title: string) {
    data.updateCategory(id, title);
  }

  function addEntry(entry: Entry) {
    data.addEntry(entry);
  }

  function deleteEntry(id: number) {
    data.deleteEntry(id);
  }

  function updateEntry(id: number, entry: Entry) {
    data.updateEntry(id, entry);
  }

  return (
    <DataContext.Provider
      value={{
        data: data.getData(),
        updateGeneral,
        addCategory,
        deleteCategory,
        updateCategory,
        addEntry,
        deleteEntry,
        updateEntry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
