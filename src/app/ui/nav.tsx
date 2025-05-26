'use client';

import { BookImage, House, Package, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useCartCount } from "@/app/lib/useCartCount";

const links = [
  { name: "Home", href: "/", icon: House },
  { name: "Catalog", href: "/catalog", icon: BookImage },
  { name: "Sellers", href: "/sellers", icon: Package },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function Nav() {
  const pathname = usePathname();
  const cartCount = useCartCount();

  return (
    <nav className="flex items-center gap-2">
      <ul className="flex gap-1">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isCart = link.name === "Cart";

          return (
            <Link
              key={link.name}
              href={link.href}
              title={link.name}
              className={clsx(
                "relative text-white p-3 rounded-md transition-all ease-in-out duration-300",
                {
                  "bg-[var(--secondary)]": pathname === link.href,
                  "hover:bg-[var(--secondary)]": pathname !== link.href,
                }
              )}
            >
              <LinkIcon className="w-5 h-5" />
              {isCart && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
