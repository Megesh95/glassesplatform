import React from 'react';
import Products from '../components/Products/Products';
import { sunglassesProducts } from '../components/Products/productData';

const SunglassesPage = ({ addToCart, addToWishlist, wishlistItems, removeFromWishlist, cartItems }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-4 mb-2">Sunglasses for You</h2>
      <div className="py-4 px-4 flex items align-middle">
        <Products
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          cartItems={cartItems}
          showFilterSidebar={true}
          customProducts={sunglassesProducts}
          hideHeader={true}
        />
      </div>
    </div>
  );
};

export default SunglassesPage; 