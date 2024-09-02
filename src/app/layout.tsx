import Navigation from "@/components/navigation";
import { DataProvider } from "@/context/data";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget",
  description: "Offline, portable, free budget app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-[100svh] overflow-y-scroll">
          <DataProvider>
            <Navigation />
            {children}
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
