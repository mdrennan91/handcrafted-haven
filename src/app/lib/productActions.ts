'use server'

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function addProduct(formData: FormData) {
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
}

// Server action to get a single product by ID
export async function getProductById(id: string) {
  const result = await sql`
    SELECT * FROM inventory WHERE id = ${id}
  `;
  return result[0];
}

// Server action to update product

export async function updateProduct(id: string, formData: FormData) {
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
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM inventory WHERE id = ${id}`;
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
