import React from "react";
import "./Wishlist.css";

function Wishlist({ wishlist, removeFromWishlist, clearWishlist, toggleWishlist, show }) {
  if (!show) return null;
  return (
    <div className="wishlist-bottom-sheet">
      <div className="wishlist-modal">
        <div className="wishlist-wrapper">
          {/* Header */}
          <div className="wishlist-header">
            <div className="wishlist-title-wrapper">
              <div className="wishlist-title">
                PRODUCTS <span>({wishlist.length})</span>
              </div>
            </div>
            <div className="wishlist-close-button" onClick={toggleWishlist}>
              X
            </div>
          </div>
          {/* Product List */}
          <div className="wishlist-products">
            {wishlist.length === 0 ? (
              <div className="wishlist-empty" style={{textAlign: 'center', padding: '32px 0', color: '#222', fontWeight: 400}}>
                You have not selected any products to compare.<br/>
                Please add products of your choice and view here.
              </div>
            ) : (
              wishlist.map((product, idx) => (
                <div className="wishlist-product-item" key={product.name}>
                  <button className="wishlist-remove-button" onClick={() => removeFromWishlist(product.name)}>
                    <span>x</span>
                  </button>
                  <a
                    href={product.link || '#'}
                    rel="noreferrer"
                    target="_blank"
                    title={product.name}
                    className="wishlist-product-link"
                  >
                    <div className="wishlist-product-img">
                      <img
                        src={product.image}
                        alt={product.name}
                        height="48"
                        width="48"
                      />
                    </div>
                    <div className="wishlist-product-details">
                      <h5 className="wishlist-product-name">{product.name}</h5>
                      <span className="wishlist-product-price">₹ {product.price}</span>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
          {wishlist.length > 0 && (
            <div className="wishlist-clear-button">
              <button  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md uppercase font-semibold" onClick={clearWishlist}>CLEAR LIST</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
