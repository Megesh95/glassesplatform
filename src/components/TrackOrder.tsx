import React, { useState } from "react";

const TrackOrder: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Tracking order:", { orderNumber, email });
    alert(`Tracking order ${orderNumber} for ${email}`);
    setIsModalOpen(false);
    setOrderNumber("");
    setEmail("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderNumber("");
    setEmail("");
  };

  return (
    <>
      <button 
        className="bg-transparent border-none text-gray-800 text-sm cursor-pointer font-medium hover:text-cyan-500 transition-colors py-4 px-6"
        onClick={openModal}
      >
        Track Order
      </button>
      
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-10 rounded-lg w-[90%] max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-5 bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              onClick={closeModal}
            >
              ×
            </button>
            
            <h2 className="text-gray-800 mb-5 text-2xl font-semibold">
              Track Your Order
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  htmlFor="orderNumber"
                  className="block mb-2 text-gray-800 font-medium"
                >
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number"
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email"
                  className="block mb-2 text-gray-800 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-cyan-500 text-white border-none p-3 px-8 rounded text-base font-semibold cursor-pointer w-full hover:bg-cyan-600 transition-colors"
              >
                Track Order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackOrder;