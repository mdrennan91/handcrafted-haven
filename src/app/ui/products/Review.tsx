import Image from "next/image";
import { lusitana } from "../fonts";
import { StarDisplay } from "./Rating";

type Review = {
  id: string;
  inventory_id: string;
  user_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  name: string | null;
};

export default function Review({ review }: { review: Review }) {
  const reviewDate = new Date(review.created_at).toLocaleDateString();

  return (
    <div className="shadow-lg p-5 rounded my-2">
      <div className="grid grid-cols-[auto_1fr] grid-rows-3 place-items-start my-3">
        <Image
          alt={review.name || "Anonymous User"}
          src="/placeholder.png"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 row-span-2 place-self-center shadow-lg shadow-black/25"
        />
        <h5 className={`${lusitana.className} ml-2`}>
          {review.name || "Anonymous"}
        </h5>
        <h5 className={`${lusitana.className} col-start-2 ml-2`}>
          {reviewDate}
        </h5>
        <div className="col-span-2 row-start-3">
          <StarDisplay rating={review.rating} />
        </div>
      </div>

      <div>{review.comment}</div>
    </div>
  );
}
