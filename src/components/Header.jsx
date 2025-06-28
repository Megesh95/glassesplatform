import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sampleProducts } from './Products/productData';

const toplinks = [
  { name: "Do More, Be More", url: "/" },
  { name: "StoreLocator", url: "/store-locator" },
  { name: "Singapore", url: "/singapore" },
  { name: "UAE", url: "/uae" },
  { name: "John Jacobs", url: "/john-jacobs" },
  { name: "Aqualens", url: "/aqualens" },
  { name: "Cobrowsing", url: "/cobrowsing" },
  { name: "Engineering Blog", url: "/blog" },
  { name: "Partner with us", url: "/partner" },
];

function Header({ onLoginClick, cartCount, wishlistCount, toggleWishlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/product/${product.id}`);
  };

  return (
    <div id="header">
      <div id="topheader">
        <div id="topheader2">
          {toplinks.map((link, index) => (
            <div key={index} className="toplink">
              <Link to={link.url} className="toplinktext">
                {link.name}
              </Link>
              {index < toplinks.length - 1 && " | "}
            </div>
          ))}
        </div>
        <Link id="contactlink" to="/contact">
          Contact Us
        </Link>
      </div>

      <div id="middleheader">
        <Link to="/" id="middleleftheader">
          <h1 id="headerlogo">V-Lens</h1>
          <h1 id="phonenumber">9XXXX-XXXXX</h1>
        </Link>

        <div id="searchbar" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="What are you looking for?"
            aria-label="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {searchTerm && (
            <div className="suggestion-box">
              <div className="suggestion-section">
                <h4 className="suggestion-heading">Matching Keywords</h4>
                {suggestions.slice(0, 4).map((product, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>

              <div className="suggestion-section">
                <h4 className="suggestion-heading">Product Recommendations</h4>
                {suggestions.map((product, index) => (
                  <div
                    key={index}
                    className="suggestion-product-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="suggestion-product-image"
                    />
                    <div className="suggestion-product-details">
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">₹ {product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div id="middlerightheader">
          <Link to="/trackorder" className="nav-link">Track Order</Link>

          <button
            className="mrhbutton auth-button"
            onClick={onLoginClick}
            aria-label="Sign in or sign up"
          >
            Sign In & Sign Up
          </button>

          <button
            onClick={toggleWishlist}
            className="relative ml-4 bg-transparent border-none outline-none cursor-pointer"
            style={{ background: 'none' }}
            aria-label="Open wishlist"
          >
            <span className="wishlist-text">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {wishlistCount}
              </span>
            )}
          </button>

          <div className="nav-link relative">
            <Link to="/cart">Cart</Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <nav id="navigator">
        {/* Add main navigation items here */}
      </nav>
    </div>
  );
}

export default Header;