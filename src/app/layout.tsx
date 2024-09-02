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
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              <div className="flex flex-col p-4 gap-4">
                <Navigation />
                {children}
              </div>
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
