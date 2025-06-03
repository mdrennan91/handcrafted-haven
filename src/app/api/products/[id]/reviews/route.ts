import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const reviews = await sql`
      SELECT r.*, u.name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.inventory_id = ${id}
      ORDER BY r.created_at DESC;
    `;

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { rating, comment } = await request.json();

    // TODO: In a real application, you would get the user_id from the authenticated user session.
    // For now, we will insert NULL for unauthenticated users as requested.
    const user_id = null; // Set user_id to null for unauthenticated users

    if (!rating || !comment) {
      return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
    }

    
    const newReview = await sql`
      INSERT INTO reviews (inventory_id, user_id, rating, comment)
      VALUES (${id}, ${user_id}, ${rating}, ${comment})
      RETURNING *;
    `;

    return NextResponse.json(newReview[0], { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
} 