import React from 'react';
import './Cart.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useState } from 'react';

const popularBanks = [
  { id: 'sbi', name: 'State Bank of India (SBI)' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'other', name: 'Other' },
];

const CartItem = ({ image, property1, property2, price1, price2, notice, finalPrice, quantity, originalPrice, discount, onRemove, onRepeat }) => (
  <div className="cart-item">
    <img src={image} alt="Eyeglasses" className="cart-item-img" />
    <div className="cart-item-details">
      <div className="line">
        <div className="text">{property1} <span className="quantity-badge">x{quantity}</span></div>
        <div className="price">
          {originalPrice ? (
            <>
              <span style={{textDecoration:'line-through', color:'#888', marginRight:6}}>₹{originalPrice}</span>
            </>
          ) : null}
        </div>
      </div>
      <div className="line">
        <div className="text">{property2}</div>
        <div className="price">
          ₹{price1}
          {discount ? (
            <span style={{color:'#059669', fontWeight:600, marginLeft:8}}>{discount}% OFF</span>
          ) : null}
        </div>
      </div>
      <div className="notice">{notice}</div>
      <div className="final-line">
        <span className="final-label">Final Price</span>
        <span className="final-price">₹{finalPrice}</span>
      </div>
      <div className="cart-actions">
        <button onClick={onRemove}>Remove</button> <span>|</span> <a href="#" onClick={e => {e.preventDefault(); onRepeat();}}>Repeat</a>
      </div>
    </div>
  </div>
);

const CartSummary = ({ totalItemPrice, totalDiscount, fittingFee, totalPayable, onCheckout }) => (
  <div className="cart-summary">
    <h3 className="bill-details-heading">Bill Details</h3>
    <div className="bill-details">
      <div className="bill-row"><span>Total item price</span><span>₹{totalItemPrice}</span></div>
      <div className="bill-row"><span>Total discount</span><span className="discount">-₹{totalDiscount}</span></div>
      <div className="bill-row"><span>Fitting Fee</span><span>₹{fittingFee}</span></div>
      <hr />
      <div className="bill-row total"><strong>Total payable</strong><strong>₹{totalPayable}</strong></div>
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

    <button className="checkout-btn MerriweatherSans500" onClick={onCheckout}>Proceed To Checkout <KeyboardArrowRightIcon /></button>
  </div>
);

const WishlistItem = ({ image, title, price, originalPrice, tag, onAddToCart, onRemove }) => (
  <div className="wishlist-item">
    <img src={image} alt="Wishlist Glasses" />
    <div className="wishlist-item-details">
      <div className="wishlist-Title MerriweatherSans500">{title}</div>
      <div className="wishlist-price MerriweatherSans300">
        ₹{price}{" "}
        {originalPrice && <span className="original-price MerriweatherSans300">₹{originalPrice}</span>}
      </div>
      {tag && <span className="tag MerriweatherSans300">{tag}</span>}
      <div className="wishlist-actions">
        <button className="add-btn" onClick={onAddToCart}>Add to Cart</button>
        <button className="remove-btn" onClick={onRemove}>Remove</button>
      </div>
    </div>
  </div>
);

const WishlistSection = ({ wishlistItems, addToCart, removeFromWishlist }) => {
  const [startIdx, setStartIdx] = useState(0);
  const VISIBLE_COUNT = 3;
  const canScrollLeft = startIdx > 0;
  const canScrollRight = startIdx + VISIBLE_COUNT < wishlistItems.length;

  const handlePrev = () => {
    if (canScrollLeft) setStartIdx(startIdx - 1);
  };
  const handleNext = () => {
    if (canScrollRight) setStartIdx(startIdx + 1);
  };

  return (
    <div className="wishlist-section">
      <div className="wishlist-top">
        <h3 className='MerriweatherSans500' style={{ fontSize: "24px" }}>
          Add items from your wishlist
        </h3>
        <div className="wishlist-nav">
          <button onClick={handlePrev} disabled={!canScrollLeft} style={{opacity: canScrollLeft ? 1 : 0.3, cursor: canScrollLeft ? 'pointer' : 'not-allowed'}}><WestIcon /></button>
          <button onClick={handleNext} disabled={!canScrollRight} style={{opacity: canScrollRight ? 1 : 0.3, cursor: canScrollRight ? 'pointer' : 'not-allowed'}}><EastIcon /></button>
        </div>
      </div>
      <div className="wishlist-items" style={{display:'flex', gap:'1rem', minHeight: '260px'}}>
        {wishlistItems.length === 0 ? (
          <div style={{color:'#888', fontStyle:'italic', padding:'1rem'}}>Your wishlist is empty.</div>
        ) : (
          wishlistItems.slice(startIdx, startIdx + VISIBLE_COUNT).map((item, idx) => (
            <WishlistItem
              key={item.name + (item.size || '')}
              image={item.image}
              title={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              tag={item.tag}
              onAddToCart={() => addToCart(item)}
              onRemove={() => removeFromWishlist(item.name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CartPage = ({ cart , removeFromCart, addToWishlist, increaseQuantity, wishlistItems = [], addToCart, removeFromWishlist }) => {
  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [confirmedPayment, setConfirmedPayment] = useState(null);
  const [selectedBank, setSelectedBank] = useState('sbi');

  // Calculate totals
  const totalItemPrice = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const totalDiscount = cart.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (Number(item.originalPrice) - Number(item.price)) * (item.quantity || 1);
    }
    return sum;
  }, 0);
  const fittingFee = cart.length > 0 ? 199 : 0;
  const totalPayable = totalItemPrice - totalDiscount + fittingFee;

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
              image={item.src || item.image}
              property1={item.name}
              price1={item.price}
              property2={item.size}
              price2={0}
              notice="You can upload prescription after payment"
              finalPrice={(Number(item.price) || 0) * (item.quantity || 1)}
              quantity={item.quantity || 1}
              originalPrice={item.originalPrice}
              discount={item.discount}
              onRemove={() => {
                setRemoveIndex(index);
                setShowModal(true);
              }}
              onRepeat={() => increaseQuantity(index)}
            />
          ))
        )}

        <WishlistSection wishlistItems={wishlistItems} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />
      </div>

      <CartSummary 
        totalItemPrice={totalItemPrice}
        totalDiscount={totalDiscount}
        fittingFee={fittingFee}
        totalPayable={totalPayable}
        onCheckout={() => setShowPaymentModal(true)}
      />
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
            addToWishlist({
              name: cart[removeIndex].name,
              price: cart[removeIndex].price,
              image: cart[removeIndex].image
  });
            
            setShowModal(false);
          }}
        >
          Move to wishlist
        </button>
      </div>
    </div>
  </div>
)}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[95%] max-w-md relative text-center">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              onClick={() => setShowPaymentModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
            <form className="flex flex-col gap-4 items-start mb-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" checked={selectedPayment === 'cod'} onChange={() => setSelectedPayment('cod')} />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="upi" checked={selectedPayment === 'upi'} onChange={() => setSelectedPayment('upi')} />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="netbanking" checked={selectedPayment === 'netbanking'} onChange={() => setSelectedPayment('netbanking')} />
                Net Banking
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="card" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} />
                Credit/Debit Card
              </label>
            </form>
            {selectedPayment === 'upi' && (
              <div className="w-full flex flex-col items-center mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120" style={{marginBottom:12, borderRadius:8, border:'1px solid #eee', background:'#fff'}}>
                  <rect x="0" y="0" width="120" height="120" fill="#fff" stroke="#eee" strokeWidth="2"/>
                  <rect x="10" y="10" width="20" height="20" fill="#222"/>
                  <rect x="90" y="10" width="20" height="20" fill="#222"/>
                  <rect x="10" y="90" width="20" height="20" fill="#222"/>
                  <rect x="40" y="40" width="10" height="10" fill="#222"/>
                  <rect x="60" y="60" width="10" height="10" fill="#222"/>
                  <rect x="80" y="80" width="10" height="10" fill="#222"/>
                </svg>
                <div className="flex gap-4 mb-2">
                  <div className="flex flex-col items-center">
                    <svg width="36" height="36" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#fff"/><path d="M24 10a14 14 0 1 1 0 28 14 14 0 0 1 0-28z" fill="#4285F4"/><path d="M24 10a14 14 0 0 1 13.86 12.1H24v5.8h7.9A7.9 7.9 0 1 1 24 10z" fill="#34A853"/><path d="M10.14 22.1A14 14 0 0 1 24 10v5.8h-7.9a7.9 7.9 0 0 0-5.96 6.3z" fill="#FBBC05"/><path d="M24 38a14 14 0 0 1-13.86-12.1H24v-5.8h-7.9A7.9 7.9 0 1 0 24 38z" fill="#EA4335"/></svg>
                    <span style={{fontSize:12, marginTop:2}}>GPay</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg width="36" height="36" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#fff"/><circle cx="24" cy="24" r="18" fill="#673ab7"/><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff" fontFamily="Arial">₹</text></svg>
                    <span style={{fontSize:12, marginTop:2}}>PhonePe</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg width="36" height="36" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#fff"/><rect x="10" y="10" width="28" height="28" rx="8" fill="#00b9f1"/><text x="24" y="32" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Arial">Paytm</text></svg>
                    <span style={{fontSize:12, marginTop:2}}>Paytm</span>
                  </div>
                </div>
                <input type="text" placeholder="Enter your UPI ID" className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs text-center" style={{marginTop:8}} />
              </div>
            )}
            {selectedPayment === 'netbanking' && (
              <div className="w-full flex flex-col items-start mb-4">
                <div className="font-semibold mb-2">Select your bank:</div>
                <div className="flex flex-col gap-2 w-full">
                  {popularBanks.map(bank => (
                    <label key={bank.id} className="flex items-center gap-2">
                      <input type="radio" name="bank" value={bank.id} checked={selectedBank === bank.id} onChange={() => setSelectedBank(bank.id)} />
                      {bank.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button
              className="checkout-btn MerriweatherSans500 w-full"
              onClick={() => { setConfirmedPayment(selectedPayment + (selectedPayment === 'netbanking' ? ` (${popularBanks.find(b=>b.id===selectedBank)?.name})` : '')); setShowPaymentModal(false); }}
            >
              Confirm Payment Method
            </button>
          </div>
        </div>
      )}
      {confirmedPayment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[95%] max-w-md relative text-center">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              onClick={() => setConfirmedPayment(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Payment Method Selected</h2>
            <div className="text-lg mb-4">
              {confirmedPayment === 'cod' && 'Cash on Delivery (COD)'}
              {confirmedPayment === 'upi' && 'UPI'}
              {confirmedPayment === 'netbanking' && 'Net Banking'}
              {confirmedPayment === 'card' && 'Credit/Debit Card'}
            </div>
            <button className="checkout-btn MerriweatherSans500 w-full" onClick={() => setConfirmedPayment(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;