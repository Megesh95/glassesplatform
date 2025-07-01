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

function Header({ onLoginClick, darkMode, cartCount, wishlistCount, toggleWishlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [navCard, setNavCard] = useState("")
  const [gender, setGender] = useState(null)
  const [category, setCategory] = useState(null)

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
    <div className = "dark:bg-zinc-800 bg-zinc-100 text-[rgba(0,0,80,1)] dark:text-[rgba(230,230,255,1)]">
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
          <h1 id="headerlogo"><img src = "/logotrans.png" className = "h-8"/></h1>
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
      </div>
      <nav className = "flex bg-zinc-200 dark:bg-zinc-700 text-[rgba(0,0,80,1)] dark:text-[rgba(230,230,255,1)] px-10 h-16" id="navigator">
        <div id = "navleft" className = "flex justify-evenly gap-4 font-semibold">
          <button onClick = {() => {
            navCard === "eyeglasses" ? setNavCard("") : setNavCard("eyeglasses")
            setGender(0)
            setCategory(classiceyeglasses)
          }}>
            EYEGLASSES
          </button>
          <button onClick = {() => {
            navCard === "screenglasses" ? setNavCard("") : setNavCard("screenglasses")
            setGender(0)
            setCategory(null)
          }}
          >
            SCREEN GLASSES
          </button>
          <button onClick = {() => {
            navCard === "kidsglasses" ? setNavCard("") : setNavCard("kidsglasses")
            setGender(0)
            setCategory(null)
          }}
          >
            KIDS GLASSES
          </button>
          <button onClick = {() => {
            navCard === "contactlenses" ? setNavCard("") : setNavCard("contactlenses")
            setGender(null)
            setCategory(contactlenses)
          }}
          >
            CONTACT LENSES
          </button>
          <button onClick = {() => {
            navCard === "sunglasses" ? setNavCard("") : setNavCard("sunglasses")
            setGender(0)
            setCategory(classiceyeglasses)
          }}
          >
            SUN GLASSES
          </button>
          <button onClick = {() => {
            navCard === "eyetest" ? setNavCard("") : setNavCard("eyetest")
          }}
          >HOME EYE-TEST</button>
          <button onClick = {() => {
            navCard === "storelocator" ? setNavCard("") : setNavCard("storelocator")
          }}
          >STORE LOCATOR</button>
        </div>
      </nav>
      {navCard === "eyeglasses" && 
      <div className = "absolute top-[28.3vh] px-10 flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
        <div className = "w-1/5 flex mt-20 flex-col">
          <button
          onClick={() => {setGender(0); setCategory(classiceyeglasses)}}
          className = {`${gender === 0 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-12" src = "/navpics/men.webp"/>Men<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(1); setCategory(classiceyeglasses)}}
          className = {`${gender === 1 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-12" src = "/navpics/women.webp"/>Women<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(2); setCategory(kidsclassiceyeglasses)}}
          className = {`${gender === 2 && "bg-orange-400/10"} py-4  rounded-md hover:bg-orange-400/10 items-center justify-between px-8 flex h-20 cursor-pointer`}><img className = "h-12" src = "/navpics/kids.webp"/>Kids<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
        </div>
        {(gender === 0 || gender === 1) && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-zinc-950/10 dark:border-zinc-100/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            onClick = {() => {setCategory(classiceyeglasses)}}
            className = {`${category === classiceyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">CLASSIC EYEGLASSES</p>
              <p className = "">Starting from Rs.2000</p>
            </button>
            <button
            onClick = {() => {setCategory(premiumeyeglasses)}}
            className = {`${category === premiumeyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">PREMIUM EYEGLASSES</p>
              <p className = "">Starting from Rs.4000</p>
            </button>
            <button
            onClick = {() => {setCategory(screeneyeglasses)}}
            className = {`${category === screeneyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">SCREEN EYEGLASSES</p>
              <p className = "">Starting from Rs.600</p>
            </button>
          </div>
        </div>}

        {gender == 2 && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-zinc-950/10 dark:border-zinc-100/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            onClick = {() => {setCategory(kidsclassiceyeglasses)}}
            className = {`${category === kidsclassiceyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">Classic Eyeglasses</p>
              <p className = "">Starting from Rs.1000</p>
            </button>
          </div>
        </div>}

        {category?.map((ceg, index) => {
          return (
            <div className = "flex flex-col w-40">
              <h1 className = "h-20 flex items-center pl-2 border-b border-zinc-950/10 dark:border-zinc-100/10">{ceg.name}</h1>
              {ceg.array.map((link, linkindex) => {
                return <a className = "text-sm text-neutral-400 dark:text-neutral-500 pl-2 dark:hover:text-[rgba(230,230,255,1)] hover:text-[rgba(0,0,80,1)]" href = {link.url}>{link.name}</a>
              })}
            </div>
          )
        })}
      </div>}


      {navCard === "screenglasses" && 
      <div className = "absolute top-[28.3vh] px-10 flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
        <div className = "w-1/5 flex mt-20 flex-col">
          <button
          onClick={() => {setGender(0)}}
          className = {`${gender === 0 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/men.webp"/>Men<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(1)}}
          className = {`${gender === 1 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/women.webp"/>Women<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(2)}}
          className = {`${gender === 2 && "bg-orange-400/10"} py-4  rounded-md hover:bg-orange-400/10 items-center justify-between px-8 flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/kids.webp"/>Kids<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
        </div>
        {(gender === 0 || gender === 1) && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-zinc-950/10 dark:border-zinc-100/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            className = {`justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">SCREEN GLASSES</p>
              <p className = "">Starting from Rs.600</p>
            </button>
          </div>
        </div>}

        {gender == 2 && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-zinc-950/10 dark:border-zinc-100/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            className = {`justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">SCREEN GLASSES</p>
              <p className = "">Starting from Rs.600</p>
            </button>
            <button
            className = {`justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">KIDS GLASSES</p>
              <p className = "">Starting from Rs.700</p>
            </button>
          </div>
        </div>}
      </div>}

      {navCard === "kidsglasses" && 
      <div className = "absolute top-[28.3vh] px-10 items-center justify-evenly flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
          <button className = "w-72 h-72 justify-center rounded-xl flex flex-col items-center dark:bg-zinc-700/50 bg-zinc-100/50"><img src = "/navpics/eyeglasses.webp"/>Eyeglasses</button>
          <button className = "w-72 h-72 justify-center rounded-xl flex flex-col items-center dark:bg-zinc-700/50 bg-zinc-100/50"><img src = "/navpics/screenglasses.webp"/>Zero Power Screen glasses</button>
          <button className = "w-72 h-72 justify-center rounded-xl flex flex-col items-center dark:bg-zinc-700/50 bg-zinc-100/50"><img src = "/navpics/sunglasses.webp"/>Sunglasses</button>
      </div>}

      {navCard === "contactlenses" &&
      <div className = "absolute top-[28.3vh] px-10 flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
        {category?.map((ceg, index) => {
          return (
            <div key = {index} className = "flex flex-col gap-2 w-48">
              <h1 className = "h-20 flex items-center text-sm pl-2 border-b border-zinc-950/10 dark:border-zinc-100/10">{ceg.name}</h1>
              {ceg.array.map((link, linkindex) => {
                return <a key = {linkindex} className = "text-sm text-neutral-400 dark:text-neutral-500 pl-2 dark:hover:text-[rgba(230,230,255,1)] hover:text-[rgba(0,0,80,1)]" href = {link.url}>{link.name}</a>
              })}
            </div>
          )
        })}
      </div>
      }


      {navCard === "sunglasses" && 
      <div className = "absolute top-[28.3vh] px-10 flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
        <div className = "w-1/5 flex mt-20 flex-col">
          <button
          onClick={() => {setGender(0); setCategory(classiceyeglasses)}}
          className = {`${gender === 0 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/men.webp"/>Men<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(1); setCategory(classiceyeglasses)}}
          className = {`${gender === 1 && "bg-orange-400/10"} py-4 px-8 rounded-md hover:bg-orange-400/10 items-center justify-between flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/women.webp"/>Women<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
          <button
          onClick={() => {setGender(2); setCategory(kidsclassiceyeglasses)}}
          className = {`${gender === 2 && "bg-orange-400/10"} py-4  rounded-md hover:bg-orange-400/10 items-center justify-between px-8 flex h-20 cursor-pointer`}><img className = "h-full" src = "/navpics/kids.webp"/>Kids<img className = "h-1/3" src = {darkMode ? "/navpics/rightarrow.svg" : "/navpics/rightarrowblack.svg"}/></button>
        </div>
        {(gender === 0 || gender === 1) && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-zinc-950/10 dark:border-zinc-100/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            onClick = {() => {setCategory(classiceyeglasses)}}
            className = {`${category === classiceyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">CLASSIC EYEGLASSES</p>
              <p className = "">Starting from Rs.2000</p>
            </button>
            <button
            onClick = {() => {setCategory(premiumeyeglasses)}}
            className = {`${category === premiumeyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">PREMIUM EYEGLASSES</p>
              <p className = "">Starting from Rs.4000</p>
            </button>
            <button
            onClick = {() => {setCategory(screeneyeglasses)}}
            className = {`${category === screeneyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">SCREEN EYEGLASSES</p>
              <p className = "">Starting from Rs.600</p>
            </button>
          </div>
        </div>}

        {gender == 2 && <div className = "flex flex-col">
          <h1 className = "h-20 flex items-center pl-4 border-b border-black/10">SELECT CATEGORY</h1>
          <div className = "flex flex-col text-lg font-thin">
            <button
            onClick = {() => {setCategory(kidsclassiceyeglasses)}}
            className = {`${category === kidsclassiceyeglasses && "bg-orange-400/10"} justify-center px-8 rounded-md hover:bg-orange-400/10 items-start flex flex-col h-20 cursor-pointer`}>
              <p className = "text-lg">Classic Eyeglasses</p>
              <p className = "">Starting from Rs.1000</p>
            </button>
          </div>
        </div>}

        {category?.map((ceg, index) => {
          return (
            <div className = "flex flex-col w-40">
              <h1 className = "h-20 flex items-center pl-2 border-b border-black/10">{ceg.name}</h1>
              {ceg.array.map((link, linkindex) => {
                return <a className = "text-sm text-neutral-400 dark:text-neutral-500 dark:hover:text-[rgba(230,230,255,1)] pl-2 hover:text-[rgba(0,0,80,1)]" href = {link.url}>{link.name}</a>
              })}
            </div>
          )
        })}
      </div>}

      {navCard === "eyetest" && 
        <div className = "absolute top-[28.3vh] flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
          <img src = "/navpics/eyetest.webp"/>
          <div className = "flex flex-col items-center text-center justify-evenly">
            <h1 className = "text-4xl">Get your eyes checked at home</h1>
            <p className = "text-2xl font-thin">A certified refractionist will visit you with latest eye testing machines & 100 trial frames</p>
            <button className = "p-3 rounded-full text-lg border dark:border-[rgba(230,230,255,1)] border-[rgba(0,0,80,1)]">Book Appointment</button>
          </div>
        </div>
      }

      {navCard === "storelocator" && 
        <div className = "absolute top-[28.3vh] flex right-10 z-50 h-[72vh] left-10 bg-zinc-100 dark:bg-zinc-950">
          <div className = "flex flex-col items-center text-center justify-evenly">
            <h1 className = "text-4xl">Over 1800+ Vlens Stores</h1>
            <p className = "text-2xl font-thin">Experience eyewear in a whole new way: Visit your nearest store and treat yourself to 5000+ eyewear styles.</p>
            <button className = "p-3 rounded-full text-lg border dark:border-[rgba(230,230,255,1)] border-[rgba(0,0,80,1)]">Locate a store</button>
          </div>
          <div className = "flex items-center justify-evenly gap-2 pr-4">
            <button className = "flex flex-col items-center"><img src = "/navpics/delhi.webp"/>Delhi</button>
            <button className = "flex flex-col items-center"><img src = "/navpics/mumbai.webp"/>Mumbai</button>
            <button className = "flex flex-col items-center"><img src = "/navpics/blr.webp"/>Chennai</button>
            <button className = "flex flex-col items-center"><img src = "/navpics/morecities.webp"/>Explore more</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Header;


const classiceyeglasses = [
  {
    name: "Our Top Picks",
    array: [
      {
        name: "random 1",
        url: "/"
      },
      {
        name: "random 2",
        url: "/"
      },
      {
        name: "random 3",
        url: "/"
      },
      {
        name: "random 4",
        url: "/"
      },
      {
        name: "random 5",
        url: "/"
      }
    ]
  },
  {
    name: "Frame Type",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Collection",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Brands",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  }
]

const premiumeyeglasses = [
  {
    name: "Brands",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Frame Shape",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Collection",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Our Top Picks",
    array: [
      {
        name: "random 1",
        url: "/"
      },
      {
        name: "random 2",
        url: "/"
      },
      {
        name: "random 3",
        url: "/"
      },
      {
        name: "random 4",
        url: "/"
      },
      {
        name: "random 5",
        url: "/"
      }
    ]
  }
]

const screeneyeglasses = [
  {
    name: "Collection",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      }
    ]
  }
]

const kidsclassiceyeglasses = [
  {
    name: "Our Top Picks",
    array: [
      {
        name: "random 1",
        url: "/"
      },
      {
        name: "random 2",
        url: "/"
      },
      {
        name: "random 3",
        url: "/"
      },
      {
        name: "random 4",
        url: "/"
      },
      {
        name: "random 5",
        url: "/"
      }
    ]
  },
  {
    name: "Frame Type",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Collection",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "AGE",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  }
]


const contactlenses = [
  {
    name: "Brands",
    array: [
      {
        name: "random 1",
        url: "/"
      },
      {
        name: "random 2",
        url: "/"
      },
      {
        name: "random 3",
        url: "/"
      },
      {
        name: "random 4",
        url: "/"
      },
      {
        name: "random 5",
        url: "/"
      }
    ]
  },
  {
    name: "Explore by Disposibility",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Explore by Power",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Explore by color",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  },
  {
    name: "Explore by solution",
    array: [
      {
        name: "random 6",
        url: "/"
      },
      {
        name: "random 7",
        url: "/"
      },
      {
        name: "random 8",
        url: "/"
      }
    ]
  }
]
