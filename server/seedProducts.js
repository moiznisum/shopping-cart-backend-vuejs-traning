import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/products.js"; 

dotenv.config();

const PRODUCT_DATA = [
  {
    name: "Iphone X",
    description: "The best smart phone available on earth",
    price: 100,
    brand: "Apple",
    image: "https://example.com/images/iphone.png",
    varients: [
      {
        title: "Capacity",
        items: [
          { title: "16gb", price: 5 },
          { title: "32gb", price: 10 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "Black", price: 10 },
          { title: "Silver", price: 15 },
          { title: "White", price: 20 },
          { title: "Golden", price: 25 }
        ]
      }
    ]
  },
  {
    name: "Cat Shoes",
    description: "The best shoes available on earth",
    price: 150,
    brand: "Caterpiller",
    image: "https://example.com/images/shoes.png",
    varients: [
      {
        title: "Shoe Size",
        items: [
          { title: "12", price: 5 },
          { title: "11", price: 10 },
          { title: "10", price: 15 },
          { title: "09", price: 20 },
          { title: "08", price: 25 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "Golden", price: 5 },
          { title: "White", price: 10 },
          { title: "Black", price: 15 }
        ]
      }
    ]
  },
  {
    name: "Bags",
    description: "The best Bags available on earth",
    price: 60,
    brand: "American Tourister",
    image: "https://example.com/images/bags.png",
    varients: [
      {
        title: "Bags Size",
        items: [
          { title: "small", price: 5 },
          { title: "medium", price: 10 },
          { title: "large", price: 15 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "yellow", price: 5 },
          { title: "brown", price: 10 },
          { title: "green", price: 15 }
        ]
      }
    ]
  },
  {
    name: "T shirts",
    description: "The best T shirts available on earth",
    price: 20,
    brand: "Gucci",
    image: "https://example.com/images/shirts.png",
    varients: [
      {
        title: "Size",
        items: [
          { title: "small", price: 5 },
          { title: "medium", price: 10 },
          { title: "large", price: 15 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "white", price: 5 },
          { title: "black", price: 10 },
          { title: "green", price: 15 }
        ]
      }
    ]
  },
  {
    name: "Pants",
    description: "The best pants available on earth",
    price: 45,
    brand: "Zara's",
    image: "https://example.com/images/pants.png",
    varients: [
      {
        title: "Size",
        items: [
          { title: "small", price: 5 },
          { title: "medium", price: 10 },
          { title: "large", price: 15 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "white", price: 2 },
          { title: "black", price: 3 },
          { title: "green", price: 5 }
        ]
      }
    ]
  },
  {
    name: "Rollex AT508 Watch",
    description: "The best watch available on earth",
    price: 200,
    brand: "Rollex",
    image: "https://example.com/images/watchs.png",
    varients: [
      {
        title: "Rist Size",
        items: [
          { title: "small", price: 5 },
          { title: "medium", price: 15 },
          { title: "large", price: 25 }
        ]
      },
      {
        title: "Color",
        items: [
          { title: "black", price: 21 },
          { title: "gold", price: 24 },
          { title: "silver", price: 28 }
        ]
      }
    ]
  }
];

async function seed() {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) throw new Error("MONGODB_URI missing in .env");

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑 Cleared existing products");

    // Insert new products
    await Product.insertMany(PRODUCT_DATA);
    console.log(`✅ Seeded ${PRODUCT_DATA.length} products`);

    await mongoose.disconnect();
    console.log("🚪 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  }
}

seed();