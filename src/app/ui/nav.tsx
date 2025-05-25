"use client";

import { BookImage, House, Package, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const links = [
  { name: "Home", href: "/", icon: House },
  { name: "Catalog", href: "/catalog", icon: BookImage },
  { name: "Sellers", href: "/sellers", icon: Package },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-2">
      <ul className="flex gap-1">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              title={link.name} // Tooltip on hover
              className={clsx(
                "text-white p-3 rounded-md transition-all ease-in-out duration-300",
                {
                  "bg-[var(--secondary)]": pathname === link.href,
                  "hover:bg-[var(--secondary)]": pathname !== link.href,
                }
              )}
            >
              <LinkIcon className="w-5 h-5" />
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}