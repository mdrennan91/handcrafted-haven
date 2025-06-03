import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: 'An array of productIds is required' }, { status: 400 });
    }

    const averageRatings = await sql`
      SELECT inventory_id, AVG(rating) as average_rating
      FROM reviews
      WHERE inventory_id = ANY(${productIds})
      GROUP BY inventory_id;
    `;

    // Convert average_rating from string (from SQL) to number and map by inventory_id
    const ratingsMap: { [productId: string]: number } = {};
    averageRatings.forEach(row => {
      ratingsMap[row.inventory_id] = parseFloat(row.average_rating as string);
    });

    return NextResponse.json(ratingsMap, { status: 200 });
  } catch (error) {
    console.error('Error fetching average ratings:', error);
    return NextResponse.json({ error: 'Failed to fetch average ratings' }, { status: 500 });
  }
} 