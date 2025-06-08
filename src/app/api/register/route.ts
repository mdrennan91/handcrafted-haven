import { NextResponse } from 'next/server';
import {
  hashPassword,
  emailExists,
  createUser,
  createSeller,
} from '@/app/lib/user';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get('email')?.toString();
    const rawPassword = formData.get('password')?.toString();
    const user_name = formData.get('user_name')?.toString();
    const user_type = formData.get('user_type')?.toString();

    if (!email || !rawPassword || !user_name || !user_type) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (await emailExists(email)) {
      return NextResponse.json(
        { error: 'Email already registered.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(rawPassword);
    const user_id = await createUser(
      email,
      hashedPassword,
      user_name,
      user_type
    );

    if (user_type === 'Seller') {
      const name = formData.get('name')?.toString();
      const specialty = formData.get('specialty')?.toString();
      const image_url =
        formData.get('image_url')?.toString() || '/images/default-avatar.png';
      const rating = Number(formData.get('rating')) || 0;
      const about = formData.get('about')?.toString();

      if (!name || !specialty || !about) {
        return NextResponse.json(
          { error: 'Missing seller fields.' },
          { status: 400 }
        );
      }

      await createSeller(user_id, name, specialty, image_url, rating, about);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Registration error:', err.message);
    } else {
      console.error('Unknown error during registration');
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
