import React, { useState } from 'react';

const eyeglassesData = [
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7875_1b_28july23.jpg',
    name: 'Black Full Rim Square',
    price: '₹ 1500',
    description: 'Classic black eyeglasses for daily use.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e12395-c2-eyeglasses_g_4493.jpg',
    name: 'Navy Blue Full Rim Rectangle',
    price: '₹ 1500',
    description: 'Stylish blue eyeglasses with lightweight frame.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-geometric-vincent-chase-sleek-steel-vc-e13786-c2-eyeglasses_ccg_3318.jpg',
    name: 'Silver Full Rim Geometric',
    price: '₹ 1500',
    description: 'Modern geometric design with sleek steel frame.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-silver-full-rim-square-vincent-chase-sleek-steel-vc-e16002-c2-eyeglasses_g_3149_09_21_23.jpg',
    name: 'Light Grey Full Rim Square',
    price: '₹ 1500',
    description: 'Sleek square eyeglasses with a modern blue-silver finish for a refined look.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Transparent-Blue-Full-Rim-Rectangle-Vincent-Chase-Classic-Acetate-VC-E13676-C3-Eyeglasses_vincent-chase-vc-e13676-c3-c3-eyeglasses_G_924107_02_2022.jpg',
    name: 'Crystal Transparent Full Rim Rectangle',
    price: '₹ 1500',
    description: 'Minimalist transparent frames with a hint of blue for effortless everyday style.'
  }
];

const sunglassesData = [
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-grey-full-rim-round-vincent-chase-polarized-met-effect-vc-s15398-c2-sunglasses_g_0998_02_02_23.jpg',
    name: 'Silver Grey Sunglasses',
    price: '₹ 1499',
    description: 'Stylish polarized sunglasses for sunny days.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-full-rim-round-vincent-chase-the-metal-edit-vc-s13112-c9-polarized-sunglasses_vincent-chase-vcs13112-c9-c9-sunglasses_sunglasses_g_8958_1_5july23.jpg',
    name: 'Black Round Sunglasses',
    price: '₹ 1799',
    description: 'Classic black round sunglasses with polarized lenses.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg',
    name: 'Wayfarer Sunglasses',
    price: '₹ 1999',
    description: 'Iconic wayfarer style with full UV protection.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-blue-full-rim-round-vincent-chase-the-metal-edit-vc-s13137-c3-sunglasses_vincent-chase-vc-s13137-c3-c3-sunglasses_sunglasses_g_8708_5july23.jpg',
    name: 'Mid Gunmetal Full Rim Round',
    price: '₹ 1999',
    description: 'Bold round-frame sunglasses with a sleek gunmetal-blue finish, perfect for a sharp modern look.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Gold-Black-Grey-Gradient-Full-Rim-Square-Vincent-Chase-Polarized-VINTAGE-VC-S11748-C4-Polarized-Sunglasses_vincent-chase-vc-s11748-c4-sunglasses_sunglasses_G_126118_02_2022.jpg',
    name: 'Gold Full Rim Rectangle',
    price: '₹ 1999',
    description: 'Elegant square sunglasses with a gold-black frame and grey gradient lenses for a premium feel.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s16958-c1-sunglasses_dd_dsc6021_04_06_2024.jpg',
    name: 'Black Full Rim Round',
    price: '₹ 1999',
    description: 'Classic full-rim wayfarers with timeless style and reliable sun protection for all-day wear.'
  }
];

const VISIBLE_COUNT = 3;

const EyeglassesSunglassesCarousel = ({ addToCart, addToWishlist, wishlistItems = [], removeFromWishlist, cartItems = [] }) => {
  return (
    <>
      <CarouselSection
        title="EYEGLASSES"
        products={eyeglassesData}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlistItems={wishlistItems}
        removeFromWishlist={removeFromWishlist}
        cartItems={cartItems}
      />

      <CarouselSection
        title="SUNGLASSES"
        products={sunglassesData}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlistItems={wishlistItems}
        removeFromWishlist={removeFromWishlist}
        cartItems={cartItems}
      />
    </>
  );
};

const CarouselSection = ({ title, products, addToCart, addToWishlist, wishlistItems, removeFromWishlist, cartItems }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(prev + 1, products.length - VISIBLE_COUNT));
  };

  const isWishlisted = selectedProduct && wishlistItems.some((item) => item.name === selectedProduct.name);
  const isInCart = selectedProduct && cartItems.some((item) => item.name === selectedProduct.name);

  return (
    <section className="w-full max-w-6xl mx-auto mt-12 mb-16 px-4 py-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-wide">{title}</h2>
      </div>
      <hr className="mb-8" />
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button onClick={handlePrev} disabled={startIdx === 0} className="absolute left-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200" style={{ top: '50%', transform: 'translateY(-50%)' }} aria-label="Previous">
          <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>

        {/* Product Cards */}
        <div className="flex justify-center w-full gap-8 md:gap-12">
          {products.slice(startIdx, startIdx + VISIBLE_COUNT).map((product) => (
            <div key={product.src} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-5 w-full max-w-xs cursor-pointer border border-gray-100 group relative overflow-hidden flex flex-col items-center" style={{ fontFamily: "'Inter', sans-serif" }} onClick={() => setSelectedProduct(product)}>
              <div className="w-full h-32 flex justify-center items-center mb-3">
                <img src={product.src} alt={product.name} className="w-full h-full object-contain rounded-t-2xl" />
              </div>
              <h3 className="text-base font-bold text-gray-900 truncate leading-tight mb-1 text-center">{product.name}</h3>
              <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm px-3 py-1 rounded-full mb-2">{product.price}</span>
              <p className="text-gray-600 text-xs text-center line-clamp-2">{product.description}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={handleNext} disabled={startIdx >= products.length - VISIBLE_COUNT} className="absolute right-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200" style={{ top: '50%', transform: 'translateY(-50%)' }} aria-label="Next">
          <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[95%] max-w-lg relative shadow-2xl border border-gray-200 flex flex-col items-center animate-fadeIn">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors" aria-label="Close">&times;</button>
            <img src={selectedProduct.src} alt={selectedProduct.name} className="w-56 h-44 object-contain mb-4 mt-2 mx-auto rounded-xl shadow" />
            <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-1 text-center">{selectedProduct.name}</h2>
            <span className="inline-block bg-blue-100 text-blue-700 font-bold text-lg px-4 py-1 rounded-full mb-2">{selectedProduct.price}</span>
            <p className="text-gray-700 mb-4 text-center leading-normal text-base">{selectedProduct.description}</p>
            <div className="flex gap-3 w-full mt-2">
              <button className={`flex-1 flex items-center justify-center gap-2 ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'} font-medium py-2 px-4 rounded-lg transition duration-150`} onClick={() => { if (!isInCart) { addToCart(selectedProduct); setSelectedProduct(null); } }} disabled={isInCart}>
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button className={`flex-1 flex items-center justify-center gap-2 border ${isWishlisted ? 'bg-red-100 text-red-500 border-red-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-400'} font-medium py-2 px-4 rounded-lg transition duration-150`} onClick={() => { if (isWishlisted) { removeFromWishlist(selectedProduct.name); } else { addToWishlist({
  name: selectedProduct.name,
  price: selectedProduct.price,
  image: selectedProduct.src
}); } }} aria-label="Toggle wishlist">
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EyeglassesSunglassesCarousel;
