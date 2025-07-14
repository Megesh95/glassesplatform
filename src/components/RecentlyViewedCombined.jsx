
import React, { createContext, useContext, useState } from "react";

// --- CONTEXT LOGIC ---
const RecentlyViewedContext = createContext();
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 10); // only store last 10
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

// --- UI COMPONENT ---
export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4 text-[#1c1c1c]">
        Recently Viewed Products
      </h2>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {recentlyViewed.map((item) => (
          <div
            key={item.id}
            className="min-w-[200px] flex-shrink-0 bg-white border border-gray-100 rounded-xl p-4 shadow"
          >
            <div className="w-full h-36 flex items-center justify-center mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 truncate mb-1">
              {item.name}
            </h3>
            <p className="text-sm font-semibold text-gray-600">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
