"use client";

import { AppData, Entry, General } from "@/types/data";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Props for the DataProvider component.
 * @typedef {Object} DataProviderProps
 * @property {ReactNode} children - The child components that will be wrapped by the DataProvider.
 */
type DataProviderProps = {
  children: ReactNode;
};

/**
 * The structure of the context data and methods.
 * @typedef {Object} DataContextType
 * @property {AppData | undefined} data - The main application data.
 * @property {function(General): void} updateGeneral - Function to update the general settings of the app.
 * @property {function(string, number): void} addCategory - Function to add a new category.
 * @property {function(string): void} deleteCategory - Function to delete a category by its ID.
 * @property {function(string, string, number): void} updateCategory - Function to update an existing category by its ID.
 * @property {function(Entry): void} addEntry - Function to add a new entry.
 * @property {function(number): void} deleteEntry - Function to delete an entry by its index.
 * @property {function(number, Entry): void} updateEntry - Function to update an existing entry by its index.
 */
type DataContextType = {
  data: AppData | undefined;
  updateGeneral: (general: General) => void;
  addCategory: (title: string, amount: number) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, title: string, amount: number) => void;
  addEntry: (entry: Entry) => void;
  deleteEntry: (id: number) => void;
  updateEntry: (id: number, entry: Entry) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * DataProvider component to manage application data and provide it to child components via context.
 * @param {DataProviderProps} props - The properties passed to the DataProvider, including child components.
 * @returns {JSX.Element} A provider component that supplies the data context to its children.
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  /**
   * Initializes the data state with data from localStorage, or defaults to an empty structure.
   * The data is persisted in localStorage to maintain state across page reloads.
   * @type {[AppData, function]} State hook that manages the application data.
   */
  const [data, setData] = useState<AppData>({
    categories: [],
    entries: [],
    general: { account: "sample", currency: "usd" },
  });
  const [initializing, setInitializing] = useState(true);

  /* Effect hook that initializes the data form localStorage */
  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (!storedData) localStorage.setItem("data", JSON.stringify(data));
    else setData(JSON.parse(storedData));

    setInitializing(false);
  }, []);

  /**
   * Effect hook that saves the current data state to localStorage whenever it changes.
   */
  useEffect(() => {
    // Prevent data from being set with initial state
    if (!initializing) localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  /**
   * Updates the general application settings.
   * @param {General} general - The general settings to be updated.
   */
  const updateGeneral = useCallback((general: General) => {
    setData((prevData) => ({
      ...prevData,
      general: { ...prevData.general, ...general },
    }));
  }, []);

  /**
   * Generates a unique identifier (UUID) for new categories.
   * @returns {string} A UUID string.
   */
  const generateUUID = (): string => {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  /**
   * Adds a new category to the data state.
   * @param {string} title - The title of the new category.
   * @param {number} amount - The initial amount associated with the category.
   */
  const addCategory = useCallback((title: string, amount: number) => {
    const id = generateUUID();
    setData((prevData) => ({
      ...prevData,
      categories: [...prevData.categories, { title, id, amount }],
    }));
  }, []);

  /**
   * Updates an existing category in the data state.
   * @param {string} id - The ID of the category to update.
   * @param {string} title - The new title for the category.
   * @param {number} amount - The new amount associated with the category.
   */
  const updateCategory = useCallback(
    (id: string, title: string, amount: number) => {
      setData((prevData) => ({
        ...prevData,
        categories: prevData.categories.map((category) =>
          category.id === id ? { ...category, title, amount } : category
        ),
      }));
    },
    []
  );

  /**
   * Deletes a category from the data state by its ID.
   * Ensures that the category is not in use by any existing entries before deletion.
   * @param {string} id - The ID of the category to delete.
   * @throws {Error} If the category is in use by any entries.
   */
  const deleteCategory = useCallback((id: string) => {
    setData((prevData) => {
      if (prevData.entries.some((entry) => entry.category === id)) {
        throw new Error("Category is in use");
      }

      return {
        ...prevData,
        categories: prevData.categories.filter(
          (category) => category.id !== id
        ),
      };
    });
  }, []);

  /**
   * Adds a new entry to the data state.
   * @param {Entry} entry - The entry to be added.
   */
  const addEntry = useCallback((entry: Entry) => {
    setData((prevData) => ({
      ...prevData,
      entries: [...prevData.entries, entry],
    }));
  }, []);

  /**
   * Updates an existing entry in the data state by its index.
   * @param {number} index - The index of the entry to update.
   * @param {Entry} entry - The new entry data.
   */
  const updateEntry = useCallback((index: number, entry: Entry) => {
    setData((prevData) => ({
      ...prevData,
      entries: prevData.entries.map((existingEntry, idx) =>
        idx === index ? entry : existingEntry
      ),
    }));
  }, []);

  /**
   * Deletes an entry from the data state by its index.
   * @param {number} index - The index of the entry to delete.
   */
  const deleteEntry = useCallback((index: number) => {
    setData((prevData) => ({
      ...prevData,
      entries: prevData.entries.filter((_, idx) => idx !== index),
    }));
  }, []);

  /**
   * Provides the data and related functions to the children components.
   * @returns {JSX.Element} The provider component wrapping the children.
   */
  return (
    <DataContext.Provider
      value={{
        data,
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

/**
 * Custom hook to access the data context.
 * Ensures that the hook is used within a DataProvider.
 * @returns {DataContextType} The data context value.
 * @throws {Error} If the hook is used outside of a DataProvider.
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
