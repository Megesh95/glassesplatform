import React from 'react';
import './Cart.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

const CartItem = ({ image, property1, property2, price1, price2, notice, finalPrice }) => (
  <div className="cart-item">
    <img src={image} alt="Eyeglasses" className="cart-item-img" />
   
    <div className="cart-item-details">
      <div className="line">
        <div className="text">{property1}</div>
        <div className="price">₹{price1}</div>
      </div>
      <div className="line">
        <div className="text">{property2}</div>
        <div className="price">₹{price2}</div>
      </div>
      <div className="notice">{notice}</div>
      <div className="final-line">
        <span className="final-label">Final Price</span>
        <span className="final-price">₹{finalPrice}</span>
      </div>
      <div className="cart-actions">
        <a href="#">Remove</a> <span>|</span> <a href="#">Repeat</a>
      </div>
    </div>
  </div>
);

const CartSummary = () => (
  <div className="cart-summary">
    <h3 className="bill-details-heading">Bill Details</h3>
    <div className="bill-details">
      <div className="bill-row"><span>Total item price</span><span>₹7000</span></div>
      <div className="bill-row"><span>Total discount</span><span className="discount">-₹333</span></div>
      <div className="bill-row"><span>Fitting Fee</span><span>₹199</span></div>
      <hr />
      <div className="bill-row total"><strong>Total payable</strong><strong>₹6866</strong></div>
    </div>

    {/* Gold Membership */}
    <div className="gold-membership">
      <strong className='MerriweatherSans500'>Add Gold Max Membership and</strong>
      <p className='MerriweatherSans300'>Avail Buy 1 Get 1 Free + 10% Cashback</p>
      <button className="gold-btn MerriweatherSans300">
        Add Gold <span className="arrow"><EastIcon fontSize="small"/></span>
      </button>
    </div>

    {/* Welcome Coupon */}
    <div className="welcome-box">
      <div>
        <strong className='MerriweatherSans500'>WELCOME applied</strong>
        <p className='MerriweatherSans300'>You are saving ₹333</p>
      </div>
      <button className="remove-btn MerriweatherSans500">REMOVE</button>
    </div>

    {/* Insurance Box */}
    <div className="insurance-box">
      <div>
        <strong className='MerriweatherSans500'>Apply Insurance</strong>
        <p className='MerriweatherSans300'>Tap to view your benefits</p>
      </div>
      <button className="arrow-btn"><EastIcon fontSize="small"/></button>
    </div>

    <button className="checkout-btn MerriweatherSans500">Proceed To Checkout <KeyboardArrowRightIcon /> </button>
  </div>
);


const WishlistItem = ({ image, title, price, originalPrice, tag }) => (
  <div className="wishlist-item">
    <img src={image} alt="Wishlist Glasses" />
    <div className="wishlist-item-details">
      <div className="wishlist-Title MerriweatherSans500">{title}</div>
      <div className="wishlist-price MerriweatherSans300">
        ₹{price}{" "}
        {originalPrice && <span className="original-price MerriweatherSans300">₹{originalPrice}</span>}
      </div>
      {tag && <span className="tag MerriweatherSans300">{tag}</span>}
    </div>
  </div>
);

const WishlistSection = () => (
  <div className="wishlist-section">
    <div className="wishlist-top">
<h3 className='MerriweatherSans500' style={{ fontSize: "24px" }}>
  Add items from your wishlist
</h3>
      <div className="wishlist-nav">
        <button><WestIcon/></button>
        <button><EastIcon/></button>
      </div>
    </div>
    <div className="wishlist-items">
      <WishlistItem
        image="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c1-eyeglasses_img_3499_14_03_2024.jpg"
        title="Lenskart BLU Scre..."
        price={600}
        originalPrice={1500}
      />
      <WishlistItem
        image="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-light-blue-transparent-full-rim-round-lenskart-blu-lb-e14061-c1_lenskart-blu-lb-e14061-c1-eyeglasses_lenskart-blu-lb-e14061-c1-eyeglasses_eyeglasses_g_9196_325_02_2022.jpg"
        title="Lenskart BLU Scre..."
        price={600}
        originalPrice={1500}
      />
      <WishlistItem
        image="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/crystal-full-rim-wayfarer-lenskart-hustlr-lh-e16985-w-c5-eyeglasses_img_2263_14march24.jpg"
        title="Lenskart Hustlr"
        price={2000}
        tag="POWERED"
      />
    </div>
  </div>
);

const CartPage = () => {
  return (
    <div className="cart-container">
      <div className="cart-section">
        <h2 className="cart-item-number">Cart (2 items)</h2>
        <CartItem
          image="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-electric-green-full-rim-wayfarer_csvfile-1706676595673-217431_(1).jpg"
          property1="Electric Green Full Rim Square Lenskart HUSTLR LAE5147-WC4 Eyeglasses"
          price1={2000}
          property2="Circular Bi-Focal KT With Photo-Chromatic Coating"
          price2={3000}
          notice="You can upload prescription after payment"
          finalPrice={5000}
        />
        <CartItem
          image="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/crystal-full-rim-wayfarer-lenskart-hustlr-lh-e16985-w-c5-eyeglasses_img_2262_14march24.jpg"
          property1="Crystal-Ace Full Rim Square Lenskart HUSTLR LHE6985-WC5"
          price1={2000}
          property2="Anti-Glare Premium"
          price2={0}
          notice="You can upload prescription after payment"
          finalPrice={2000}
        />
        <WishlistSection />
      </div>
      <CartSummary />
    </div>
  );
};

export default CartPage;
