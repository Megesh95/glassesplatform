import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-8 pt-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-light mb-6 leading-tight">
            Buy The Best Eyewear From Lenskart
          </h1>
          <div className="text-white text-lg leading-relaxed">
            <p>
              Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, Lenskart Caters To Every Customer With Several Deals And Offers.
            </p>
            <p className="mt-4">
              A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, Lenskart Delivers Them Right At Your Doorstep With Convenient Methods Of Payment.{" "}
              <span className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors">Sunglasses</span> as well as{" "}
              <span className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors">Eyeglasses</span> Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colors. If You Want To Try Out{" "}
              <span className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors">Contact Lenses</span>, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.
            </p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Services Column */}
          <div>
            <h3 className="text-2xl font-normal mb-6">Services</h3>
            <ul className="space-y-5">
              <li>
                <a 
                  href="https://www.lenskart.com/stores" 
                  className="text-white hover:text-teal-400 transition-colors text-sm"
                >
                  Store Locator
                </a>
              </li>
              <li>
                <a 
                  href="https://www.lenskart.com/buying-guide" 
                  className="text-white hover:text-teal-400 transition-colors text-sm"
                >
                  Buying Guide
                </a>
              </li>
              <li>
                <a 
                  href="https://www.lenskart.com/frame-size-guide" 
                  className="text-white hover:text-teal-400 transition-colors text-sm"
                >
                  Frame Size
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="text-2xl font-normal mb-6">About Us</h3>
            <ul className="space-y-5">
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  We Are Hiring
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  Refer And Earn
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  Lenskart Coupons
                </a>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-2xl font-normal mb-6">Help</h3>
            <ul className="space-y-5">
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  Grievance Redressal
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-sm">
                  Cardemi
                </a>
              </li>
            </ul>
          </div>

          {/* App Download Column */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 mb-2">
              <a
                href="https://www.lenskart.com/mobile-app"
                className="bg-black rounded-lg p-1 inline-flex items-center"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-9"
                />
              </a>
              <a
                href="https://www.lenskart.com/mobile-app"
                className="bg-black rounded-lg p-1 inline-flex items-center"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-9"
                />
              </a>
            </div>
            <div className="text-center text-lg mt-2 text-white">
              <div className="font-medium">Download Lenskart App to buy</div>
              <div>Eyeglasses, Sunglasses and Contact Lenses</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-indigo-700 pt-6 flex flex-col md:flex-row justify-between items-center text-base mt-8 pb-6">
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="text-white hover:text-teal-400 transition-colors">
              T & C
            </a>
            <a 
              href="https://www.lenskart.com/privacy-policy?rd=n" 
              className="text-white hover:text-teal-400 transition-colors"
            >
              Privacy
            </a>
            <a href="#" className="text-white hover:text-teal-400 transition-colors">
              Disclaimer
            </a>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-base">
              <span>Version 1.0.0</span>
              <span className="text-gray-400">| |</span>
              <span>Follow Us</span>
            </div>
            <div className="flex gap-3">
              <a
                href="https://m.facebook.com/Lenskartindia/"
                className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <svg width="13" height="13" fill="#fff" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lenskart/"
                className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-all"
              >
                <svg width="13" height="13" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://x.com/lenskartME"
                className="w-6 h-6 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors"
              >
                <svg width="13" height="13" fill="#fff" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;