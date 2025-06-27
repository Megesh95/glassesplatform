import ProductCard from "./ProductCards";
import { useState } from "react";


const sampleProducts = [
  {
    name: "Lenskart Air",
    size: "Medium - Essential Edit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 1222,
    colors: ["#000000", "#C0C0C0", "#1F2937"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/Lenskart-Air-LA-E14360-C1-Eyeglasses_J_1837.jpg",
    description: "A perfect blend of style and functionality, these black-rimmed eyeglasses from Lenskart Air feature a lightweight design with a modern essential edit finish. Designed for everyday comfort, they make a timeless choice."
  },
  {
    name: "Air Fusion Black",
    size: "Medium - Air Fusion",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 814,
    colors: ["#000000", "#2D2D2D", "#444444"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/black-gunmetal-full-rim-round-lenskart-air-fusion-la-e13071-c1-eyeglasses_lenskart-air-la-e13035-c1-eyeglasses_g_7860_2_05_july23.jpg",
    description: "These fusion eyeglasses combine sleek black aesthetics with feather-light comfort. Ideal for long wear, their Air Fusion build delivers durability without compromising on minimalistic charm."
  },
  {
    name: "Lenskart Blue",
    size: "Medium - Essential Edit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 1222,
    colors: ["#1e3a8a", "#1f2937", "#374151"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/Lenskart-Air-LA-E14360-C2-Eyeglasses_J_1844.jpg",
    description: "Stay cool and confident with the Lenskart Blue eyeglasses, designed in striking navy tones. Crafted with a strong yet light build, they're perfect for professionals and students alike."
  },
  {
    name: "Rose Gold Classic",
    size: "Medium - Lightweight Metal",
    price: 1800,
    originalPrice: 2400,
    discount: 25,
    rating: 4.8,
    reviews: 1192,
    colors: ["#FFC0CB", "#FFDAB9", "#FFE4E1"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/brown-blue-full-rim-round-lenskart-air-switch-la-e15851-c2-clip-on-eyeglasses_g_6573_22_08_2023.jpg",
    description: "Add a subtle pop of elegance with the Rose Gold Classic eyeglasses. Lightweight metal frames in soft blush tones make these glasses a stylish and graceful companion for any outfit."
  },
  {
    name: "Translucent Grey",
    size: "Medium - Essential Edit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 688,
    colors: ["#d1d5db", "#6b7280", "#9ca3af"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/green-transparent-green-full-rim-round-lenskart-air-essentials-la-e16715-c2-eyeglasses_img_5255_04_03_2024.jpg",
    description: "Modern and versatile, the Translucent Grey eyeglasses blend muted tones with a clean, essential design. A go-to choice for those who love minimalism with a futuristic touch."
  },
  {
    name: "Gunmetal Round",
    size: "Medium - Metal Series",
    price: 1600,
    originalPrice: 2100,
    discount: 24,
    rating: 4.8,
    reviews: 850,
    colors: ["#4b5563", "#9ca3af", "#6b7280"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/Gunmetal-Black-Full-Rim-Round-Lenskart-Air-Clip-On-LA-E14398-C2-Eyeglasses_G_7793.jpg",
    description: "Rugged yet refined, the Gunmetal Round frames are part of the metal series designed for durability and edge. Their industrial-chic look pairs effortlessly with bold personalities."
  },
  {
    name: "Purple Minimalist",
    size: "Medium - Slim Rim",
    price: 1700,
    originalPrice: 2300,
    discount: 26,
    rating: 4.8,
    reviews: 905,
    colors: ["#e9d5ff", "#a78bfa", "#c4b5fd"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e16644-c1-eyeglasses_img_0350_09_01_2024.jpg",
    description: "Step into soft sophistication with the Purple Minimalist frames. Their pastel slim rim design offers lightweight elegance, making them a dreamy choice for everyday flair."
  },
  {
    name: "Classic Gold Rim",
    size: "Medium - Retro Frame",
    price: 1900,
    originalPrice: 2500,
    discount: 24,
    rating: 4.8,
    reviews: 998,
    colors: ["#FFD700", "#fef3c7", "#fcd34d"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gold-black-full-rim-round-john-jacobs-tr-flex-jj-e14410-c6-eyeglasses__dsc7005_20_06_2024.jpg",
    description: "Channel vintage vibes with the Classic Gold Rim eyeglasses. Featuring a retro frame with a rich golden finish, this pair is for those who love timeless statement pieces."
  },
  {
    name: "Matte Navy",
    size: "Medium - Matte Series",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 800,
    colors: ["#1e3a8a", "#1f2937", "#334155"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-full-rim-round-lenskart-air-essentials-la-e14360-n-c1-eyeglasses_csvfile-1699433626617-img_3727.jpg",
    description: "Make a bold yet classy statement with Matte Navy frames. Their smooth finish and dark blue tones exude confidence, making them a versatile pick for any setting."
  },
  {
    name: "Minimal Black Rim",
    size: "Medium - Classic Fit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 1024,
    colors: ["#000000", "#4b5563", "#6b7280"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/black-full-rim-round-vincent-chase-sleek-steel-vc-e14032-c2-eyeglasses_g_2005_29_july.jpg",
    description: "Sleek and sharp, the Minimal Black Rim glasses offer a classic fit for everyday style. With a sturdy design and matte finish, they bring practicality and polish together."
  },
  {
    name: "Lenskart Air",
    size: "Medium - Classic Fit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 1024,
    colors: ["#000000", "#4b5563", "#6b7280"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17594-c1-eyeglasses_dsc5692_23_11_2024.jpg",
    description: "A true classic from the Lenskart Air line, this variant offers a clean, adaptable look for any face shape. Ideal for professionals who prioritize both form and function."
  },
  {
    name: "Minimal Rim",
    size: "Medium - Classic Fit",
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    rating: 4.8,
    reviews: 1024,
    colors: ["#000000", "#4b5563", "#6b7280"],
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-black-yellow-full-rim-round-lenskart-air-switch-la-e000134-c1-clip-on-eyeglasses__dsc2376_20_09_2024.jpg",
    description: "Simple and smart, the Minimal Rim glasses deliver a clean profile with balanced proportions. Designed for all-day wear, they fuse classic appeal with modern detailing."
  }
];


function Products({ addToCart, wishlistItems, addToWishlist, removeFromWishlist }) {
  const [sortOption, setSortOption] = useState("");

  let sortedProducts = [...sampleProducts];

  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="px-4 py-4 bg-gray-50 min-h-screen">
      
      {/* Header and Sort Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Eyeglasses for You</h2>

        <div className="flex items-center">
          <span className="text-teal-600 font-semibold mr-2 flex items-center">
            ⇅ SORT BY
          </span>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Best Sellers</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {sortedProducts.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product} 
            addToCart={addToCart} 
            wishlistItems={wishlistItems}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>

    </div>
  );
}

export default Products;
