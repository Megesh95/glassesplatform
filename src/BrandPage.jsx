import React from "react";
import { useParams } from "react-router-dom";
import Products from "./components/Products/Products";

const BrandPage = ({
  addToCart,
  wishlistItems,
  addToWishlist,
  removeFromWishlist,
  cartItems,
}) => {
  const { brandName } = useParams(); // gets 'hustlr' from /brand/hustlr

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white shadow">
        <img
          src="https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif"
          alt="AS SEEN ON SHARK TANK"
          className="w-full"
          
        />
      </div>

      <Products
        selectedBrand={brandName}
        addToCart={addToCart}
        wishlistItems={wishlistItems}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
        cartItems={cartItems}
      />
    </div>
  );
};

export default BrandPage;
