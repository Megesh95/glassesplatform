import React, { useState } from "react";
import "./Wishlist.css";


function Wishlist() {
    const [showWishlist, setShowWishlist] = useState(false);

    function toggleWishlist(){
      setShowWishlist(!showWishlist);
    };
  
  return (
    <>
    <button onClick={toggleWishlist}>wishlist</button>

        <div className={`wishlist-body ${showWishlist ? "show" : ""}`}>
        <div className="wishlist-wrapper">
          {/* Header */}
          <div className="wishlist-header">
            <div className="wishlist-title-wrapper">
              <div className="wishlist-title">
                PRODUCTS <span>(3)</span>
              </div>
            </div>
            <div className="wishlist-close-button" onClick={toggleWishlist}>X</div>
          </div>

          {/* Product List */}
          <div className="wishlist-products">
            {/* Product 1 */}
            <div className="wishlist-product-item">
              <a className="wishlist-remove-button">
                <span>x</span>
              </a>
              <a
                href="/lenskart-blu-lb-e16383-c1-eyeglasses.html"
                rel="noreferrer"
                target="_blank"
                title="Lenskart BLU Screen Glasses"
                className="wishlist-product-link"
                >
                <div className="wishlist-product-img">
                  <img
                    src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3499_14_03_2024.jpg"
                    alt=""
                    height="48"
                    width="48"
                    />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="wishlist-product-name">
                    Lenskart BLU Screen Glasses
                  </h5>
                  <span className="wishlist-product-price">₹ 600</span>
                </div>
              </a>
            </div>

            {/* Product 2 */}
            <div className="wishlist-product-item">
              <a className="wishlist-remove-button">
                <span>x</span>
              </a>
              <a
                href="/blue-block-phone-computer-glasses-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1.html"
                rel="noreferrer"
                target="_blank"
                title="Lenskart BLU Screen Glasses"
                className="wishlist-product-link"
                >
                <div className="wishlist-product-img">
                  <img
                    src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&amp;-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9196_325_02_2022.jpg"
                    alt=""
                    height="48"
                    width="48"
                  />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="wishlist-product-name">
                    Lenskart BLU Screen Glasses
                  </h5>
                  <span className="wishlist-product-price">₹ 600</span>
                </div>
              </a>
            </div>

            {/* Product 3 */}
            <div className="wishlist-product-item">
              <a className="wishlist-remove-button">
                <span>x</span>
              </a>
              <a
                href="/lenskart-hustlr-lh-e16985-w-c5-eyeglasses.html"
                rel="noreferrer"
                target="_blank"
                title="Lenskart Hustlr"
                className="wishlist-product-link"
                >
                <div className="wishlist-product-img">
                  <img
                    src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/crystal-full-rim-wayfarer-lenskart-hustlr-lh-e16985-w-c5-eyeglasses_img_2263_14march24.jpg"
                    alt=""
                    height="48"
                    width="48"
                    />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="wishlist-product-name">Lenskart Hustlr</h5>
                  <span className="wishlist-product-price">₹ 2000</span>
                </div>
              </a>
            </div>

            
          </div>

          {/* Clear List Button */}
          <div className="wishlist-clear-button">
            <a href="/">CLEAR LIST</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
