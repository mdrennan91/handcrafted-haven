import Image from "next/image";
import { lusitana } from "../ui/fonts";

export default function Content() {
  return (
    <>
      <main className="p-3 bg-[var(--accent1-light)]">
        <h1 className={`${lusitana.className} text-center`}>
          Welcome to Our Team 08 Project
        </h1>
        <p className="text-center my-10">
          This is the landing page. More to come soon!
        </p>
        <div className="flex flex-col items-center md:grid md:grid-cols-5 md:grid-rows-3 gap-5 m-auto max-w-[500] md:max-w-full">
          <section className="md:col-span-3 md:col-start-3 md:row-start-1 shadow-xl shadow-gray-400 p-5 rounded-sm">
            <strong>Catalog</strong> <br /> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam tincidunt, sapien ac consectetur
            blandit, ante leo laoreet ante, nec ultrices nunc eros nec libero.
            Curabitur vel laoreet dolor, nec lobortis tellus. Aenean sed
            hendrerit risus. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed efficitur lacus eu tortor suscipit, a efficitur eros
            gravida. Donec quis est sit amet dui congue sodales. Donec turpis
            arcu, condimentum at eros nec, luctus vestibulum nulla. Praesent
            cursus massa enim, a sodales elit tincidunt at. Quisque mattis
            sollicitudin elit, vitae convallis ligula dignissim et. Morbi quis
            mattis ex. Sed ultrices hendrerit eros ut placerat. Maecenas eget
            leo nisi.
          </section>
          <Image
            alt=""
            src="/placeholder.png"
            width={500}
            height={500}
            className="md:col-span-2 md:col-start-1 md:row-start-1"
          />
          <section className="md:col-span-3 md:row-start-2 shadow-xl shadow-gray-400 p-5 rounded-sm">
            <strong>Sellers</strong> <br /> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam tincidunt, sapien ac consectetur
            blandit, ante leo laoreet ante, nec ultrices nunc eros nec libero.
            Curabitur vel laoreet dolor, nec lobortis tellus. Aenean sed
            hendrerit risus. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed efficitur lacus eu tortor suscipit, a efficitur eros
            gravida. Donec quis est sit amet dui congue sodales. Donec turpis
            arcu, condimentum at eros nec, luctus vestibulum nulla. Praesent
            cursus massa enim, a sodales elit tincidunt at. Quisque mattis
            sollicitudin elit, vitae convallis ligula dignissim et. Morbi quis
            mattis ex. Sed ultrices hendrerit eros ut placerat. Maecenas eget
            leo nisi.
          </section>
          <Image
            alt=""
            src="/placeholder.png"
            width={500}
            height={500}
            className="md:col-span-2 md:col-start-4 md:row-start-2"
          />
          <section className="md:col-span-3 md:col-start-3 md:row-start-3 shadow-xl shadow-gray-400 p-5 rounded-sm">
            <strong>Account/Login</strong> <br /> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nam tincidunt, sapien ac consectetur
            blandit, ante leo laoreet ante, nec ultrices nunc eros nec libero.
            Curabitur vel laoreet dolor, nec lobortis tellus. Aenean sed
            hendrerit risus. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed efficitur lacus eu tortor suscipit, a efficitur eros
            gravida. Donec quis est sit amet dui congue sodales. Donec turpis
            arcu, condimentum at eros nec, luctus vestibulum nulla. Praesent
            cursus massa enim, a sodales elit tincidunt at. Quisque mattis
            sollicitudin elit, vitae convallis ligula dignissim et. Morbi quis
            mattis ex. Sed ultrices hendrerit eros ut placerat. Maecenas eget
            leo nisi.
          </section>
          <Image
            alt=""
            src="/placeholder.png"
            width={500}
            height={500}
            className="md:col-span-2 md:col-start-1 md:row-start-3"
          />
        </div>
      </main>
    </>
  );
}
