import { Lusitana, Noto_Sans } from "next/font/google";

// This is the Lusitana font, which is used for headings and other important text.
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// This is the Noto Sans font, which is used for body text and other general text.
export const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});