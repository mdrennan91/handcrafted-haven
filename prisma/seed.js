/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  await prisma.seller.createMany({
    data: [
      {
        id: "sarah",
        name: "Sarah’s Studio",
        specialty: "Ceramics",
        imageUrl: "https://i.pravatar.cc/150?img=12",
        rating: 4.8,
      },
      {
        id: "liam",
        name: "Liam’s Looms",
        specialty: "Textiles",
        imageUrl: "https://i.pravatar.cc/150?img=33",
        rating: 4.6,
      },
      {
        id: "june",
        name: "June's Creations",
        specialty: "Baskets & Decor",
        imageUrl: "https://i.pravatar.cc/150?img=45",
        rating: 4.9,
      },
      {
        id: "nina",
        name: "Nina’s Knits",
        specialty: "Knitted Goods",
        imageUrl: "https://i.pravatar.cc/150?img=23",
        rating: 4.7,
      },
      {
        id: "marco",
        name: "Marco’s Metalworks",
        specialty: "Metal Sculptures",
        imageUrl: "https://i.pravatar.cc/150?img=29",
        rating: 4.5,
      },
      {
        id: "ellie",
        name: "Ellie’s Embroidery",
        specialty: "Embroidered Gifts",
        imageUrl: "https://i.pravatar.cc/150?img=47",
        rating: 4.9,
      },
      {
        id: "kyle",
        name: "Kyle’s Carvings",
        specialty: "Wood Carvings",
        imageUrl: "https://i.pravatar.cc/150?img=18",
        rating: 4.4,
      },
      {
        id: "tasha",
        name: "Tasha’s Trinkets",
        specialty: "Jewelry",
        imageUrl: "https://i.pravatar.cc/150?img=56",
        rating: 4.6,
      },
      {
        id: "leo",
        name: "Leo’s Leatherworks",
        specialty: "Leather Goods",
        imageUrl: "https://i.pravatar.cc/150?img=38",
        rating: 4.5,
      },
      {
        id: "maya",
        name: "Maya’s Macramé",
        specialty: "Home Decor",
        imageUrl: "https://i.pravatar.cc/150?img=42",
        rating: 4.8,
      },
      {
        id: "elias",
        name: "Elias’ Engravings",
        specialty: "Engraved Gifts",
        imageUrl: "https://i.pravatar.cc/150?img=61",
        rating: 4.7,
      },
      {
        id: "zoe",
        name: "Zoe’s Zines",
        specialty: "Handmade Books",
        imageUrl: "https://i.pravatar.cc/150?img=16",
        rating: 4.9,
      },
      {
        id: "ronan",
        name: "Ronan’s Resin",
        specialty: "Resin Art",
        imageUrl: "https://i.pravatar.cc/150?img=63",
        rating: 4.6,
      },
      {
        id: "ivy",
        name: "Ivy’s Illustrations",
        specialty: "Art Prints",
        imageUrl: "https://i.pravatar.cc/150?img=21",
        rating: 4.9,
      },
      {
        id: "gabe",
        name: "Gabe’s Glassworks",
        specialty: "Blown Glass",
        imageUrl: "https://i.pravatar.cc/150?img=34",
        rating: 4.5,
      },
    ],
  });

  await prisma.product.createMany({
    data: [

      // sarah's products
      {
        title: "Handmade Mug",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "sarah",
      },
      {
        title: "Clay Teapot",
        price: 35.0,
        imageUrl: "/placeholder.png",
        sellerId: "sarah",
      },
      {
        title: "Ceramic Bowl Set",
        price: 48.0,
        imageUrl: "/placeholder.png",
        sellerId: "sarah",
      },
      {
        title: "Decorative Vase",
        price: 40.0,
        imageUrl: "/placeholder.png",
        sellerId: "sarah",
      },
      {
        title: "Small Planter Pot",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "sarah",
      },

      // liam's products
      {
        title: "Chunky Knit Blanket",
        price: 55.0,
        imageUrl: "/placeholder.png",
        sellerId: "liam",
      },
      {
        title: "Handwoven Scarf",
        price: 25.0,
        imageUrl: "/placeholder.png",
        sellerId: "liam",
      },
      {
        title: "Macrame Wall Hanging",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "liam",
      },
      {
        title: "Boho Plant Hanger",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "liam",
      },
      {
        title: "Woven Pillow Cover",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "liam",
      },

      // june's products
      {
        title: "Woven Storage Basket",
        price: 28.0,
        imageUrl: "/placeholder.png",
        sellerId: "june",
      },
      {
        title: "Handmade Picnic Basket",
        price: 40.0,
        imageUrl: "/placeholder.png",
        sellerId: "june",
      },
      {
        title: "Decorative Fruit Bowl",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "june",
      },
      {
        title: "Rustic Wicker Tray",
        price: 26.0,
        imageUrl: "/placeholder.png",
        sellerId: "june",
      },
      {
        title: "Handcrafted Wall Basket",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "june",
      },

      // nina's products
      {
        title: "Chunky Knit Scarf",
        price: 32.0,
        imageUrl: "/placeholder.png",
        sellerId: "nina",
      },
      {
        title: "Handmade Wool Hat",
        price: 24.0,
        imageUrl: "/placeholder.png",
        sellerId: "nina",
      },
      {
        title: "Knitted Baby Blanket",
        price: 45.0,
        imageUrl: "/placeholder.png",
        sellerId: "nina",
      },
      {
        title: "Cozy Fingerless Gloves",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "nina",
      },
      {
        title: "Cable Knit Sweater",
        price: 68.0,
        imageUrl: "/placeholder.png",
        sellerId: "nina",
      },

      // marco's products
      {
        title: "Forged Iron Candle Holder",
        price: 36.0,
        imageUrl: "/placeholder.png",
        sellerId: "marco",
      },
      {
        title: "Abstract Metal Sculpture",
        price: 85.0,
        imageUrl: "/placeholder.png",
        sellerId: "marco",
      },
      {
        title: "Wall-Mounted Iron Art",
        price: 58.0,
        imageUrl: "/placeholder.png",
        sellerId: "marco",
      },
      {
        title: "Handcrafted Garden Trellis",
        price: 72.0,
        imageUrl: "/placeholder.png",
        sellerId: "marco",
      },
      {
        title: "Steel Fire Pit Ring",
        price: 110.0,
        imageUrl: "/placeholder.png",
        sellerId: "marco",
      },

      // ellie's products
      {
        title: "Floral Embroidered Hoop",
        price: 28.0,
        imageUrl: "/placeholder.png",
        sellerId: "ellie",
      },
      {
        title: "Personalized Name Patch",
        price: 16.0,
        imageUrl: "/placeholder.png",
        sellerId: "ellie",
      },
      {
        title: "Embroidered Tote Bag",
        price: 34.0,
        imageUrl: "/placeholder.png",
        sellerId: "ellie",
      },
      {
        title: "Mini Hoop Ornament Set",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "ellie",
      },
      {
        title: "Embroidered Pillow Cover",
        price: 40.0,
        imageUrl: "/placeholder.png",
        sellerId: "ellie",
      },

      // kyle's products
      {
        title: "Hand-Carved Wooden Spoon Set",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "kyle",
      },
      {
        title: "Rustic Wall Art Plaque",
        price: 48.0,
        imageUrl: "/placeholder.png",
        sellerId: "kyle",
      },
      {
        title: "Wooden Jewelry Box",
        price: 55.0,
        imageUrl: "/placeholder.png",
        sellerId: "kyle",
      },
      {
        title: "Custom Name Sign",
        price: 38.0,
        imageUrl: "/placeholder.png",
        sellerId: "kyle",
      },
      {
        title: "Woodland Animal Figurines",
        price: 27.0,
        imageUrl: "/placeholder.png",
        sellerId: "kyle",
      },

      // tasha's products
      {
        title: "Crystal Drop Earrings",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "tasha",
      },
      {
        title: "Gold-Plated Charm Bracelet",
        price: 34.0,
        imageUrl: "/placeholder.png",
        sellerId: "tasha",
      },
      {
        title: "Gemstone Pendant Necklace",
        price: 29.0,
        imageUrl: "/placeholder.png",
        sellerId: "tasha",
      },
      {
        title: "Hand-Stamped Initial Ring",
        price: 19.0,
        imageUrl: "/placeholder.png",
        sellerId: "tasha",
      },
      {
        title: "Boho Beaded Anklet",
        price: 15.0,
        imageUrl: "/placeholder.png",
        sellerId: "tasha",
      },

      // leo's products
      {
        title: "Hand-Stitched Leather Wallet",
        price: 49.0,
        imageUrl: "/placeholder.png",
        sellerId: "leo",
      },
      {
        title: "Custom Leather Belt",
        price: 42.0,
        imageUrl: "/placeholder.png",
        sellerId: "leo",
      },
      {
        title: "Leather Notebook Cover",
        price: 35.0,
        imageUrl: "/placeholder.png",
        sellerId: "leo",
      },
      {
        title: "Slim Cardholder",
        price: 25.0,
        imageUrl: "/placeholder.png",
        sellerId: "leo",
      },
      {
        title: "Leather Keychain Set",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "leo",
      },

      // maya's products
      {
        title: "Boho Wall Hanging",
        price: 45.0,
        imageUrl: "/placeholder.png",
        sellerId: "maya",
      },
      {
        title: "Macramé Plant Hanger",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "maya",
      },
      {
        title: "Woven Coaster Set",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "maya",
      },
      {
        title: "Mini Macramé Keychain",
        price: 12.0,
        imageUrl: "/placeholder.png",
        sellerId: "maya",
      },
      {
        title: "Macramé Curtain Tiebacks",
        price: 20.0,
        imageUrl: "/placeholder.png",
        sellerId: "maya",
      },

      // elias' products
      {
        title: "Personalized Cutting Board",
        price: 38.0,
        imageUrl: "/placeholder.png",
        sellerId: "elias",
      },
      {
        title: "Engraved Wooden Spoon Set",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "elias",
      },
      {
        title: "Custom Wood Photo Frame",
        price: 28.0,
        imageUrl: "/placeholder.png",
        sellerId: "elias",
      },
      {
        title: "Engraved Key Holder",
        price: 20.0,
        imageUrl: "/placeholder.png",
        sellerId: "elias",
      },
      {
        title: "Rustic Engraved Plaque",
        price: 32.0,
        imageUrl: "/placeholder.png",
        sellerId: "elias",
      },

      // zoe's products
      {
        title: "Dreamscape Zine",
        price: 12.0,
        imageUrl: "/placeholder.png",
        sellerId: "zoe",
      },
      {
        title: "Art & Ink Sketchbook",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "zoe",
      },
      {
        title: "Hand-bound Poetry Journal",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "zoe",
      },
      {
        title: "Comic Zine Collection",
        price: 16.0,
        imageUrl: "/placeholder.png",      
        sellerId: "zoe",
      },
      {
        title: "Mystery Microzine Pack",
        price: 10.0,
        imageUrl: "/placeholder.png",
        sellerId: "zoe",
      },

      // ronan's products
      {
        title: "Resin Galaxy Coasters",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "ronan",
      },
      {
        title: "Pressed Flower Bookmark",
        price: 12.0,
        imageUrl: "/placeholder.png",
        sellerId: "ronan",
      },
      {
        title: "Glow-in-the-Dark Keychain",
        price: 8.0,
        imageUrl: "/placeholder.png",
        sellerId: "ronan",
      },
      {
        title: "Ocean Wave Tray",
        price: 40.0,
        imageUrl: "/placeholder.png",
        sellerId: "ronan",
      },
      {
        title: "Resin Jewelry Dish",
        price: 20.0,
        imageUrl: "/placeholder.png",
        sellerId: "ronan",
      },

      // ivy's products
      {
        title: "Botanical Line Art",
        price: 20.0,
        imageUrl: "/placeholder.png",
        sellerId: "ivy",
      },
      {
        title: "Sun & Moon Minimalist Print",
        price: 18.0,
        imageUrl: "/placeholder.png",
        sellerId: "ivy",
      },
      {
        title: "Abstract Color Shapes",
        price: 22.0,
        imageUrl: "/placeholder.png",
        sellerId: "ivy",
      },
      {
        title: "Custom Portrait Sketch",
        price: 35.0,
        imageUrl: "/placeholder.png",
        sellerId: "ivy",
      },
      {
        title: "Celestial Art Trio",
        price: 28.0,
        imageUrl: "/placeholder.png",
        sellerId: "ivy",
      },

      // gabe's products
      {
        title: "Swirled Glass Vase",
        price: 45.0,
        imageUrl: "/placeholder.png",
        sellerId: "gabe",
      },
      {
        title: "Rainbow Glass Ornament",
        price: 15.0,
        imageUrl: "/placeholder.png",
        sellerId: "gabe",
      },
      {
        title: "Handblown Wine Glasses (Set of 2)",
        price: 55.0,
        imageUrl: "/placeholder.png",
        sellerId: "gabe",
      },
      {
        title: "Glass Feather Sculpture",
        price: 30.0,
        imageUrl: "/placeholder.png",
        sellerId: "gabe",
      },
      {
        title: "Ocean Blue Paperweight",
        price: 20.0,
        imageUrl: "/placeholder.png",
        sellerId: "gabe",
      },

    ],
  });

  console.log("Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());