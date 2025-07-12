import React from 'react';
import Products from '../components/Products/Products';
import { screenGlassesProducts } from '../components/Products/productData';

const ScreenGlassesPage = ({ addToCart, addToWishlist, wishlistItems, removeFromWishlist, cartItems }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-4 mb-2">Screen Glasses for You</h2>
      <div className="py-4 px-4 flex items align-middle">
        <Products
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          cartItems={cartItems}
          showFilterSidebar={true}
          customProducts={screenGlassesProducts}
          hideHeader={true}
        />
      </div>
    </div>
  );
};

export default ScreenGlassesPage; 