export type AppData = {
  general?: General;
  categories: Category[];
  entries: Entry[];
};

export type Entry = {
  id: string;
  title: string;
  category: string;
  date: EpochTimeStamp;
  amount: number;
};

export type Category = {
  id: string;
  title: string;
};

export type General = {
  account?: string;
  currency?: string;
};
