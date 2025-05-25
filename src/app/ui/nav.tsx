"use client";

import { BookImage, House, PencilRuler } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

import React from "react";
import { lusitana } from "./fonts";

const links = [
  { name: "Home", href: "/", icon: House },
  {
    name: "Catalog",
    href: "/catalog",
    icon: BookImage,
  },
  { name: "Sellers", href: "/sellers", icon: PencilRuler },
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
              className={clsx(
                "text-white px-4 py-2 rounded-md transition-all ease-in-out duration-300",
                {
                  "bg-[var(--secondary)]": pathname === link.href,
                  "hover:bg-[var(--secondary)]": pathname !== link.href,
                }
              )}
            >
              <LinkIcon className="mb-1 w-6 inline-block" />
              <p className={`${lusitana.className} hidden md:inline-block mx-1 text-sm`}>
                {link.name}
              </p>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
