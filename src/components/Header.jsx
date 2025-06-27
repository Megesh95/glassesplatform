import './Header.css';
import { Link } from 'react-router-dom';

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

function Header({ onLoginClick }) {
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
        
        <div id="searchbar">
          <input 
            type="text"
            placeholder="What are you looking for?"
            aria-label="Search products"
          />
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
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </div>
      </div>

      <nav id="navigator">
      </nav>
    </div>
  );
}

export default Header;