import Image from "next/image";
import Link from "next/link";
import Nav from "../ui/nav";
import { KeyRound } from "lucide-react";
import { lusitana } from "../ui/fonts";

export default function Header() {
  return (
    <header className="flex justify-between bg-[var(--primary)]">
      <Link href="/" className="place-self-center mr-5">
        <Image
          alt="Logo"
          src="/logos/header-nav-logo.png"
          width={200}
          height={100}
          className="m-3"
        />
      </Link>
      <div className="flex items-center justify-between">
        <Nav />
        <Link
          href="/login"
          className="flex flex-col md:flex-row items-center text-white m-3 gap-2 transition-all hover:scale-110 justify-self-end"
        >
          <span className={`${lusitana.className} text-center`}>Log in</span>{" "}
          <KeyRound className="hidden md:block" width={20} />
        </Link>
      </div>
    </header>
  );
}
