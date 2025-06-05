import Image from "next/image";
import Link from "next/link";
import Nav from "../ui/nav";
import { User, LogOut } from "lucide-react"; 
import clsx from "clsx";
import CategoryDropdown from "./CategoryDropdown";
import { signOut, auth } from '@/auth';


export default async function Header() {
  const session = await auth();
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
        <div className="flex items-center gap-2 flex-1 max-w-3xl mx-auto w-full">
          <CategoryDropdown />
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search for anything"
              className="bg-white text-black rounded-full pl-4 pr-12 py-2 w-full border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-white rounded-full p-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/** Right: Nav + Log in/Log out */}
        <div className="flex items-center gap-2 ml-auto">
          <Nav />
        {/** Logic to display login or logout icon and button */}
          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"     
                title="Log out"           
                className={clsx(
                  "text-white p-3 rounded-md transition-all ease-in-out duration-300",
                  "hover:bg-[var(--secondary)]"
              )}
              >
                <LogOut className="w-6" />                
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              title="Log in"
              className={clsx(
                "text-white p-3 rounded-md transition-all ease-in-out duration-300",
                "hover:bg-[var(--secondary)]"
              )}
            >
              <User className="w-5 h-5" />    
            </Link>
          )}
      </div>
      </div>
    </header>
  );
}
