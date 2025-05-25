import Image from "next/image";
import Link from "next/link";
import Nav from "../ui/nav";
import { KeyRound } from "lucide-react";
import { lusitana } from "../ui/fonts";

export default function Header() {
  return (
    <header className="bg-[var(--primary)] shadow-sm py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            alt="Logo"
            src="/logos/header-nav-logo.png"
            width={200}
            height={100}
            className="m-2"
          />
        </Link>

        {/* Center: Search + Categories */}
        <div className="flex items-center gap-2 flex-1 justify-center max-w-xl">
          <select className="bg-[var(--secondary)] text-black font-medium rounded-full px-4 py-2 text-sm sm:text-base shadow-sm border border-transparent hover:bg-[var(--secondary-light)]">
            <option value="">All Categories</option>
            <option value="ceramics">Ceramics</option>
            <option value="textiles">Textiles</option>
            <option value="decor">Decor</option>
            <option value="jewelry">Jewelry</option>
            <option value="art">Art</option>
            <option value="woodwork">Woodwork</option>
            <option value="glass">Glass</option>
          </select>
          <input
            type="text"
            placeholder="Search for anything"
            className="bg-white text-black rounded-full px-4 py-2 w-full border border-gray-300 focus:outline-none"
          />
        </div>

        {/* Right: Nav + Login */}
        <div className="flex items-center gap-2 ml-auto">
          <Nav />
          <Link
            href="/login"
            className="flex items-center text-white gap-2 px-3 py-2 hover:bg-[var(--primary-light)] rounded-md transition"
          >
            <span className={`${lusitana.className} text-sm md:text-base`}>Log in</span>
            <KeyRound className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
