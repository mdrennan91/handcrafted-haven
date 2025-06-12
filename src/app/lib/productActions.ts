'use server'

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function addProduct(formData: FormData) {
  try {
  const inv_title = formData.get('inv_title') as string;
  const inv_description = formData.get('inv_description') as string;
  const inv_price = Number(formData.get('inv_price'));
  const inv_discount = Number(formData.get('inv_discount')) || 0;
  // const image_url = formData.get('image_url') as string;
  const featured = formData.get('featured') === 'on';
  const seller_id = formData.get('seller_id') as string;
  //Add after getServerSession authentication is done.
  // const session = await getServerSession();
  // const seller = await sql`SELECT id FROM sellers WHERE email = ${session?.user?.email}`;
  // const seller_id = seller[0]?.id;

  await sql`
  INSERT INTO inventory (inv_title, inv_description, inv_price, inv_discount, featured, seller_id)
  VALUES (${inv_title}, ${inv_description}, ${inv_price}, ${inv_discount}, ${featured}, ${seller_id})
`;
  revalidatePath('/dashboard');
  redirect('/dashboard');

  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert product data.');
  }
}

// Server action to get a single product by ID
export async function getProductById(id: string) {
  try {
    const result = await sql`
      SELECT * FROM inventory WHERE id = ${id}
    `;
    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data.');
  }
}

// Server action to update product

export async function updateProduct(id: string, formData: FormData) {

  try {
    const inv_title = formData.get('inv_title') as string;
    const inv_description = formData.get('inv_description') as string;
    const inv_price = Number(formData.get('inv_price'));
    const inv_discount = Number(formData.get('inv_discount')) || 0;
    // const image_url = formData.get('image_url') as string;
    const featured = formData.get('featured') === 'on';

    await sql`
      UPDATE inventory
      SET inv_title = ${inv_title},
          inv_description = ${inv_description},
          inv_price = ${inv_price},
          inv_discount = ${inv_discount},
          featured = ${featured}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard');
    redirect('/dashboard');

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update product data.');
  }
}

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM inventory WHERE id = ${id}`;
    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete product data.');
  }
}

export async function addReview(productId: string, rating: number, comment: string) {
  
  const user_id = null; // Set user_id to null for unauthenticated users

  if (!rating || !comment) {
    // In a real app, you might throw an error or return a specific response
    console.error('Rating and comment are required');
    return { error: 'Rating and comment are required' };
  }

  try {
    await sql`
      INSERT INTO reviews (inventory_id, user_id, rating, comment)
      VALUES (${productId}, ${user_id}, ${rating}, ${comment})
    `;

  } catch (error) {
    console.error('Error adding review:', error);
    return { error: 'Failed to add review' };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true };
}

export async function getAverageRatings(productIds: string[]): Promise<{ [productId: string]: number }> {

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return {};
  }

  try {
    const averageRatings = await sql`
      SELECT inventory_id, AVG(rating) as average_rating
      FROM reviews
      WHERE inventory_id = ANY(${productIds})
      GROUP BY inventory_id;
    `;

    const ratingsMap: { [productId: string]: number } = {};
    averageRatings.forEach(row => {
      ratingsMap[row.inventory_id] = parseFloat(row.average_rating as string);
    });

    return ratingsMap;
  } catch (error) {
    console.error('Error fetching average ratings:', error);
    // Return an empty map or re-throw the error depending on desired behavior
    return {};
  }
}
