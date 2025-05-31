import Image  from "next/image";
import { notoSans } from "./fonts";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
        <Image
            alt="Handcrafted Haven"
            src="/logos/transparent-elephant-logo.png"
            width={100}
            height={100}
            className="m-2"
        />
        <span className={`${notoSans.className} text-3xl font-bold text-[var(--primary)]`}>Handcrafted Haven</span>      
    </div>
  );
}