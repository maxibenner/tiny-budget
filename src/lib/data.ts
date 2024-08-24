import { Category, Entry, General } from "@/types/data";

/**
 * Data class to manage categories and entries and general data
 * @class Data
 * @method getGeneral       Get general data
 * @method updateGeneral    Update general data
 * @method getCategories    Get all categories
 * @method addCategory      Add a new category
 * @method updateCategory   Update a category
 * @method deleteCategory   Delete a category
 * @method getEntries       Get all entries
 * @method addEntry         Add a new entry
 * @method updateEntry      Update an entry
 * @method deleteEntry      Delete an entry
 */
export class Data {
  private data: { categories: Category[]; entries: Entry[]; general: General };

  constructor() {
    const data = localStorage.getItem("data");
    this.data = data
      ? JSON.parse(data)
      : {
          categories: [],
          entries: [],
          general: { account: "sample", currency: "usd" },
        };
  }

  private save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }

  private generateUUID(): string {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getData() {
    return this.data;
  }

  updateGeneral(general: General) {
    this.data.general = { ...this.data.general, ...general };
    this.save();
  }

  addCategory(title: string) {
    const id = this.generateUUID();
    this.data.categories.push({ title, id });
    this.save();
  }

  updateCategory(id: string, title: string) {
    const category = this.data.categories.find(
      (category) => category.id === id
    );
    if (category) {
      category.title = title;
    }

    this.save();
  }

  deleteCategory(id: string) {
    if (this.data.entries.some((entry) => entry.category === id)) {
      throw new Error("Category is in use");
    }

    this.data.categories = this.data.categories.filter(
      (category) => category.id !== id
    );

    this.save();
  }

  addEntry(entry: Entry) {
    this.data.entries.push(entry);
    this.save();
  }

  updateEntry(index: number, entry: Entry) {
    this.data.entries[index] = entry;
    this.save();
  }

  deleteEntry(index: number) {
    this.data.entries.splice(index, 1);
    this.save();
  }
}
