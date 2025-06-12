// src/app/lib/user.ts

import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function emailExists(email: string) {
  const result = await sql`SELECT 1 FROM users WHERE email = ${email}`;
  return result.length > 0;
}

export async function createUser(
  email: string,
  hashedPassword: string,
  user_name: string,
  user_type: string
) {
  const [user] = await sql`
    INSERT INTO users (email, password, user_name, user_type)
    VALUES (${email}, ${hashedPassword}, ${user_name}, ${user_type})
    RETURNING user_id
  `;
  return user.user_id;
}

export async function createSeller(
  user_id: number,
  name: string,
  specialty: string,
  image_url: string,
  rating: number,
  about: string
) {
  await sql`
    INSERT INTO sellers (id, name, specialty, image_url, rating, about)
    VALUES (${user_id}, ${name}, ${specialty}, ${image_url}, ${rating}, ${about});
  `;
}
