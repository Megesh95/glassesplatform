import React from 'react';
import Products from '../components/Products/Products';
import { kidsGlassesProducts } from '../components/Products/productData';

const KidsGlassesPage = ({ addToCart, addToWishlist, wishlistItems, removeFromWishlist, cartItems }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-4 mb-2">Kids Glasses for You</h2>
      <div className="py-4 px-4 flex items align-middle">
        <Products
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          cartItems={cartItems}
          showFilterSidebar={true}
          customProducts={kidsGlassesProducts}
          hideHeader={true}
        />
      </div>
    </div>
  );
};

export default KidsGlassesPage; 