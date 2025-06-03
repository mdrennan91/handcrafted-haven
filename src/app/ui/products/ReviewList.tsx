import Review from "@/app/ui/products/Review";

type Review = {
  id: string;
  inventory_id: string;
  user_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  name: string | null;
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </div>
  );
}
