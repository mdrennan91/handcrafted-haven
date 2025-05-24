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
    <nav className="md:pr-7 lg:pr-30 xl:pr-40">
      <ul className="flex">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-white bg-[var(--primary)] px-5 py-6 transition-all ease-in-out duration-500 hover:translate-y-3 hover:rounded-b-lg hover:shadow-gray-500 hover:shadow-lg",
                {
                  "bg-[var(--secondary)]": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="mb-1 w-6 inline-block" />
              <p
                className={`${lusitana.className} hidden md:inline-block mx-1 text-lg`}
              >
                {link.name}
              </p>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
