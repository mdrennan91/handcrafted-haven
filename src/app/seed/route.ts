import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
});

export async function GET() {
  try {
    await sql`
      INSERT INTO sellers (name, specialty, image_url, rating) VALUES 
        ('Sarah’s Studio', 'Ceramics', 'https://i.pravatar.cc/150?img=12', 4.8),
        ('Liam’s Looms', 'Textiles', 'https://i.pravatar.cc/150?img=33', 4.6),
        ('June’s Creations', 'Baskets & Decor', 'https://i.pravatar.cc/150?img=45', 4.9)
      ON CONFLICT DO NOTHING;
    `;

    await sql`
        INSERT INTO inventory (inv_title, inv_description, inv_price, inv_discount, seller_id, featured) VALUES 
            ('Handmade Mug', 'A handcrafted ceramic mug.', 1800, 0,
            (SELECT id FROM sellers WHERE name = 'Sarah’s Studio' LIMIT 1), true),
            ('Woven Blanket', 'Soft and cozy blanket.', 4200, 0,
            (SELECT id FROM sellers WHERE name = 'Liam’s Looms' LIMIT 1), false),
            ('Decorative Basket', 'Perfect for storage or decor.', 2500, 10,
            (SELECT id FROM sellers WHERE name = 'June’s Creations' LIMIT 1), true),
            ('Macrame Wall Hanging', 'A beautiful handmade macrame piece to add charm to any wall.', 3200, 5,
            (SELECT id FROM sellers WHERE name = 'Sarah’s Studio' LIMIT 1), false)
        ON CONFLICT DO NOTHING;
        `;

    return Response.json({ message: 'Seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ error }, { status: 500 });
  }
}