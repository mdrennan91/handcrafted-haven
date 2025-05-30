import Image from "next/image";
import Link from "next/link";
import { lusitana } from "../ui/fonts";
import { Facebook, Instagram } from "lucide-react";

const links = [
  { name: "About", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
];

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={`${lusitana.className} bg-[var(--primary)] p-3`}>
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-5 items-center">
        <Link href="/">
          <Image
            alt="Logo"
            src="/logos/solid-backg-elephant-logo.png"
            width={50}
            height={50}
            className="place-self-start"
          />
        </Link>
        <div className="flex flex-col justify-center md:flex-row w-full text-center justify-self-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white md:mx-6"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="justify-self-end flex flex-col md:flex-row">
          {socialLinks.map((link) => {
            const SocialIcon = link.icon;
            return (
              <Link key={link.name} href={link.href} className="my-1 md:mx-2">
                <SocialIcon
                  height={25}
                  className="text-white mb-1 inline-block"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="col-span-3 text-center mt-4">
        <span className="text-white">
          &copy; {date} HandCrafted Heaven. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
