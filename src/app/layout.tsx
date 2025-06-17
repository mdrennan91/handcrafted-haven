import type { Metadata } from "next";
import "./globals.css";
import { notoSans } from "./ui/fonts";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Handcrafted Haven",
    default: "Handcrafted Haven",
  },
  description: "Discover Handcrafted Haven – a vibrant online marketplace where artisans and crafters sell unique handmade goods. Support local creators, explore sustainable products, and find one-of-a-kind treasures crafted with care.",
  metadataBase: new URL("https://handcrafted-haven-zeta.vercel.app")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}