"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className="flex gap-4 pt-4 px-4">
      <Link href="/">
        <p className={`${path === "/" ? "underline" : ""}`}> Items</p>
      </Link>
      <Link href="/categories">
        <p className={`${path.includes("/categories") ? "underline" : ""}`}>
          {" "}
          Categories
        </p>
      </Link>
      <Link href="/analytics">
        <p className={`${path.includes("/analytics") ? "underline" : ""}`}>
          Analytics
        </p>
      </Link>
    </nav>
  );
}
