export type AppData = {
  general?: General;
  categories: Category[];
  entries: Entry[];
};

export type Entry = {
  title: string;
  category: string;
  date: string;
  amount: number;
};

export type Category = {
  id: string;
  title: string;
  amount: number;
};

export type General = {
  account?: string;
  currency?: string;
};
