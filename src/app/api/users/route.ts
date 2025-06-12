import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const users =
      await sql`SELECT user_id, user_name, email, user_type FROM users`;
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { user_id, user_type } = await req.json();

    // Deleting from sellers if user is a seller
    if (user_type === 'Seller') {
      await sql`DELETE FROM sellers WHERE id = ${user_id}`;
    }

    // Then deleting the user
    await sql`DELETE FROM users WHERE user_id = ${user_id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Deleting user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
