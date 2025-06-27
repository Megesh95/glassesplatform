import type React from "react"

const FooterSection: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white w-full overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>      
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="relative backdrop-blur-sm bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 pt-16">

          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-orange-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:border-teal-400/30">
              <h1 className="text-6xl font-extralight mb-8 leading-tight bg-gradient-to-r from-white via-teal-200 to-orange-200 bg-clip-text text-transparent hover:from-teal-300 hover:to-orange-300 transition-all duration-700">
                Buy The Best Eyewear From V-lens
              </h1>
              <div className="text-gray-200 text-lg leading-relaxed space-y-6">
                <p className="backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 hover:border-teal-400/30 hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-cyan-500/10 transition-all duration-500 hover:shadow-lg hover:shadow-teal-500/20">
                  V-lens Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, V-lens Caters To Every Customer With Several Deals And Offers.
                </p>
                <p className="backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-amber-500/10 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20">
                  A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, V-lens Delivers Them Right At Your Doorstep With Convenient Methods Of Payment.{" "}
                  <span className="text-teal-400 cursor-pointer hover:text-teal-300 transition-all duration-300 hover:bg-teal-400/20 px-3 py-1 rounded-full hover:shadow-lg hover:shadow-teal-400/30 hover:scale-105 inline-block">Sunglasses</span> as well as{" "}
                  <span className="text-orange-400 cursor-pointer hover:text-orange-300 transition-all duration-300 hover:bg-orange-400/20 px-3 py-1 rounded-full hover:shadow-lg hover:shadow-orange-400/30 hover:scale-105 inline-block">Eyeglasses</span> Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colors. If You Want To Try Out{" "}
                  <span className="text-amber-400 cursor-pointer hover:text-amber-300 transition-all duration-300 hover:bg-amber-400/20 px-3 py-1 rounded-full hover:shadow-lg hover:shadow-amber-400/30 hover:scale-105 inline-block">Contact Lenses</span>, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">

            <div className="group">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-teal-400/40 hover:bg-gradient-to-br hover:from-teal-500/15 hover:to-cyan-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2">
                <h3 className="text-2xl font-light mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-cyan-300 transition-all duration-500">Services</h3>
                <ul className="space-y-4">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-teal-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-teal-400/20"
                    >
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-teal-400/50"></span>
                      Store Locator
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-cyan-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-cyan-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-cyan-400/20"
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-cyan-400/50"></span>
                      Buying Guide
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-200 hover:text-orange-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-orange-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-orange-400/20"
                    >
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-orange-400/50"></span>
                      Frame Size
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-orange-400/40 hover:bg-gradient-to-br hover:from-orange-500/15 hover:to-amber-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
                <h3 className="text-2xl font-light mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-amber-300 transition-all duration-500">About Us</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-200 hover:text-orange-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-orange-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-orange-400/20">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-orange-400/50"></span>
                      We Are Hiring
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-200 hover:text-amber-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-amber-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-amber-400/20">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-amber-400/50"></span>
                      Refer And Earn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-200 hover:text-orange-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-orange-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-orange-400/20">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-orange-400/50"></span>
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-teal-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-teal-400/20">
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-teal-400/50"></span>
                      V-lens Coupons
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-cyan-400/40 hover:bg-gradient-to-br hover:from-cyan-500/15 hover:to-blue-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
                <h3 className="text-2xl font-light mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500">Help</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-200 hover:text-cyan-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-cyan-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-cyan-400/20">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-cyan-400/50"></span>
                      FAQ's
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-blue-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-blue-400/20">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-blue-400/50"></span>
                      Grievance Redressal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-200 hover:text-teal-300 transition-all duration-300 text-sm flex items-center group/item hover:bg-teal-400/10 p-2 rounded-lg hover:shadow-lg hover:shadow-teal-400/20">
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-teal-400/50"></span>
                      Cardemi
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-amber-400/40 hover:bg-gradient-to-br hover:from-amber-500/15 hover:to-orange-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-6">
                  <a
                    href="#"
                    className="backdrop-blur-lg bg-gradient-to-r from-black/60 to-gray-900/60 rounded-xl p-3 inline-flex items-center hover:from-black/80 hover:to-gray-900/80 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-400/20"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      className="h-9"
                    />
                  </a>
                  <a
                    href="#"
                    className="backdrop-blur-lg bg-gradient-to-r from-black/60 to-gray-900/60 rounded-xl p-3 inline-flex items-center hover:from-black/80 hover:to-gray-900/80 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-orange-400/40 hover:shadow-xl hover:shadow-orange-400/20"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                      className="h-9"
                    />
                  </a>
                </div>
                <div className="text-center text-lg text-gray-200">
                  <div className="font-medium bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:via-cyan-300 group-hover:to-orange-300 transition-all duration-500">Download V-lens App to buy</div>
                  <div className="text-sm mt-2 text-gray-300">Eyeglasses, Sunglasses and Contact Lenses</div>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-r from-white/15 to-white/5 rounded-2xl border border-white/20 hover:border-teal-400/30 p-8 flex flex-col md:flex-row justify-between items-center text-base mb-8 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500">
            <div className="flex gap-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-200 hover:text-teal-300 transition-all duration-300 hover:bg-teal-400/10 px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-teal-400/20 hover:scale-105">
                T & C
              </a>
              <a 
                href="#" 
                className="text-gray-200 hover:text-orange-300 transition-all duration-300 hover:bg-orange-400/10 px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-orange-400/20 hover:scale-105"
              >
                Privacy
              </a>
              <a href="#" className="text-gray-200 hover:text-cyan-300 transition-all duration-300 hover:bg-cyan-400/10 px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105">
                Disclaimer
              </a>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-base text-gray-300">
                <span className="backdrop-blur-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-teal-400/30 text-teal-200 hover:bg-gradient-to-r hover:from-teal-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/30">Version 2.0.0</span>
                <span className="text-gray-500">|</span>
                <span className="text-amber-300">Follow Us</span>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 backdrop-blur-lg bg-gradient-to-br from-blue-600/80 to-blue-700/80 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
                >
                  <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 backdrop-blur-lg bg-gradient-to-br from-pink-500/80 via-purple-600/80 to-orange-500/80 rounded-full flex items-center justify-center hover:from-pink-400 hover:via-purple-500 hover:to-orange-400 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-pink-400/50 shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1"
                >
                  <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 backdrop-blur-lg bg-gradient-to-br from-cyan-500/80 to-teal-600/80 rounded-full flex items-center justify-center hover:from-cyan-400 hover:to-teal-500 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                >
                  <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
