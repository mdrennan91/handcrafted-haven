'use client';

import { BookImage, House, Package, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
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
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <nav className="flex items-center gap-2">
      <div className=" flex justify-flex items-center">
        <button 
        className="md:hidden flex flex-col space-y-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hamburger Menu"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      {!isOpen && (
          <ul className="hidden md:flex md:gap-1">
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
        )}
        {isOpen && (
          <ul className="flex flex-col h-full w-90 gap-1 fixed left-0 top-0 bg-amber-50/90 md:hidden z-50 pt-40">
            {links.map((link) => {
              const LinkIcon = link.icon;
              const isCart = link.name === "Cart";
              return (
                <li key={link.name} className="text-center">
                  <Link
                    href={link.href}
                    title={link.name}
                    className={clsx(
                      "relative text-[var(--secondary)] p-3 rounded-md transition-all ease-in-out duration-300 block",
                      {
                        "bg-[var(--secondary)] text-white": pathname === link.href,
                        "hover:bg-[var(--secondary)] hover:text-white": pathname !== link.href,
                      }
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <LinkIcon className="w-5 h-5 inline mr-2" />
                    {link.name}
                    {isCart && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}   </div>
    </nav>
  );
}
