import React from 'react';
import './Cart.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useState } from 'react';



const CartItem = ({ image, property1, property2, price1, price2, notice, finalPrice, onRemove }) => (
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
        <button onClick={onRemove}>Remove</button> <span>|</span> <a href="#">Repeat</a>
      </div>
    </div>
  </div>
);

const CartSummary = () => (
  <div className="cart-summary">
    <h3 className="bill-details-heading">Bill Details</h3>
    <div className="bill-details">
      <div className="bill-row"><span>Total item price</span><span>₹4500</span></div>
      <div className="bill-row"><span>Total discount</span><span className="discount">-₹333</span></div>
      <div className="bill-row"><span>Fitting Fee</span><span>₹199</span></div>
      <hr />
      <div className="bill-row total"><strong>Total payable</strong><strong>₹4366</strong></div>
    </div>

    <div className="gold-membership">
      <strong className='MerriweatherSans500'>Add Gold Max Membership and</strong>
      <p className='MerriweatherSans300'>Avail Buy 1 Get 1 Free + 10% Cashback</p>
      <button className="gold-btn MerriweatherSans300">
        Add Gold <span className="arrow"><EastIcon fontSize="small" /></span>
      </button>
    </div>

    <div className="welcome-box">
      <div>
        <strong className='MerriweatherSans500'>WELCOME applied</strong>
        <p className='MerriweatherSans300'>You are saving ₹333</p>
      </div>
      <button className="remove-btn MerriweatherSans500">REMOVE</button>
    </div>

    <div className="insurance-box">
      <div>
        <strong className='MerriweatherSans500'>Apply Insurance</strong>
        <p className='MerriweatherSans300'>Tap to view your benefits</p>
      </div>
      <button className="arrow-btn"><EastIcon fontSize="small" /></button>
    </div>

    <button className="checkout-btn MerriweatherSans500">Proceed To Checkout <KeyboardArrowRightIcon /></button>
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
        <button><WestIcon /></button>
        <button><EastIcon /></button>
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

const CartPage = ({ cart , removeFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);

  return (
    <div className="cart-container">
      <div className="cart-section">
        <h2 className="cart-item-number">Cart ({cart.length} items)</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CartItem
              key={index}
              image={item.image}
              property1={item.name}
              price1={item.price}
              property2={item.size}
              price2={0}
              notice="You can upload prescription after payment"
              finalPrice={item.price}
              onRemove={() => {
                setRemoveIndex(index);
                setShowModal(true);
              }}

            />
          ))
        )}

        <WishlistSection />
      </div>

      <CartSummary />
      {showModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm relative text-center">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-2">Remove Item From Cart?</h2>
      <p className="text-sm text-gray-600 mb-4">
        Instead, you could wishlist this item and access it later.
      </p>
      <div className="flex justify-around">
        <button
          className="border border-blue-900 text-blue-900 px-4 py-2 rounded hover:bg-blue-50"
          onClick={() => {
            removeFromCart(removeIndex);
            setShowModal(false);
          }}
        >
          Yes, remove
        </button>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          onClick={() => {
            // Optional: You can move to wishlist logic here
            setShowModal(false);
          }}
        >
          Move to wishlist
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CartPage;