import './Header.css';
import { Link } from 'react-router-dom';

const toplinks = [
  { name: "Do More, Be More", url: "/" },
  { name: "StoreLocator", url: "/" },
  { name: "Singapore", url: "/" },
  { name: "UAE", url: "/" },
  { name: "John Jacobs", url: "/" },
  { name: "Aqualens", url: "/" },
  { name: "Cobrowsing", url: "/" },
  { name: "Engineering Blog", url: "/" },
  { name: "Partner with us", url: "/" },
];

function Header({ setShowSignUp }) {
  return (
    <div id="header">
      {/* Top Header */}
      <div id="topheader">
        <div id="topheader2">
          {toplinks.map((link, index) => (
            <div key={index} className="toplink">
              <Link to={link.url} className="toplinktext">
                {link.name}
              </Link>
              {toplinks[index + 1] && " | "}
            </div>
          ))}
        </div>
        <Link id="contactlink" to="/">
          Contact Us
        </Link>
      </div>

      {/* Middle Header */}
      <div id="middleheader">
        <Link to="/" id="middleleftheader">
          <h1 id="headerlogo">V-Lens</h1>
          <h1 id="phonenumber">9XXXX-XXXXX</h1>
        </Link>
        <div id="searchbar">
          <input type="text" placeholder="What are you looking for?" />
        </div>
        <div id="middlerightheader">
          <Link to="/TrackOrder">Track Order</Link>
          <button className="mrhbutton" onClick={() => setShowSignUp(true)}>
            Sign In & Sign Up
          </button>
          <Link to="/Wishlist">Wishlist</Link>
          <Link to="/Cart">Cart</Link>
        </div>
      </div>

      {/* Navigation placeholder */}
      <nav id="navigator"></nav>
    </div>
  );
}

export default Header;
