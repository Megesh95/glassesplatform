import React, { useState } from "react";

const TrackOrderPage = ({ darkMode }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });

      const data = await response.json();

      if (response.ok && data?.id) {
        setOrderStatus(data);
      } else {
        setError(data?.error || "Order not found. Please check your order number and email address.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const base = darkMode ? "text-" : "text-";
    switch (status?.toLowerCase()) {
      case "delivered":
        return `${base}green-500`;
      case "shipped":
      case "out for delivery":
        return `${base}blue-400`;
      case "processing":
        return `${base}yellow-400`;
      default:
        return `${base}gray-400`;
    }
  };

  const getProgressPercentage = () => {
    if (!orderStatus?.timeline) return 0;
    const completedSteps = orderStatus.timeline.filter((step) => step.completed).length;
    return (completedSteps / orderStatus.timeline.length) * 100;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {!orderStatus ? (
          <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
              <p className="text-lg">Enter your order details to track your V-lens purchase</p>
            </div>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="orderNumber" className="block mb-3 font-semibold text-lg">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., VL2024001234"
                    required
                    className={`w-full p-4 rounded-lg focus:outline-none text-base transition-colors ${
                      darkMode
                        ? 'bg-zinc-700 border border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-blue-400'
                        : 'border-2 border-gray-300 text-gray-800 focus:border-cyan-500'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-3 font-semibold text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className={`w-full p-4 rounded-lg focus:outline-none text-base transition-colors ${
                      darkMode
                        ? 'bg-zinc-700 border border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-blue-400'
                        : 'border-2 border-gray-300 text-gray-800 focus:border-cyan-500'
                    }`}
                  />
                </div>

                {error && (
                  <div className={`px-4 py-3 rounded-lg text-center font-medium text-sm ${
                    darkMode ? 'bg-red-900 border border-red-700 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Tracking Order...
                    </div>
                  ) : (
                    "Track My Order"
                  )}
                </button>
              </form>

              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-50 text-gray-700'}`}>
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm mb-3">
                  Can't find your order number? Check your email confirmation or contact our support team.
                </p>
                <button className="text-sm font-medium hover:underline transition-colors duration-200 
                  ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-cyan-500 hover:text-cyan-600'}"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">Order Status</h1>
              <p className="text-lg">Order #{orderStatus.id}</p>
            </div>

            <div className="mb-12">
              <div className="bg-gray-300 dark:bg-zinc-700 rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className={`flex justify-between text-sm font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <span>Order Placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Order Timeline</h2>
                <div className="space-y-6">
                  {orderStatus.timeline?.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`w-5 h-5 rounded-full mt-1 mr-4 flex-shrink-0 ${
                          step.completed ? "bg-cyan-500" : darkMode ? "bg-zinc-600" : "bg-gray-300"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`font-semibold text-lg ${step.completed ? "" : darkMode ? "text-zinc-400" : "text-gray-500"}`}
                            >
                              {step.status}
                            </h3>
                            <p className={`text-sm mt-1 ${step.completed ? '' : darkMode ? "text-zinc-500" : "text-gray-400"}`}>
                              {step.description}
                            </p>
                          </div>
                          <div className={`text-right text-sm ${step.completed ? '' : darkMode ? "text-zinc-400" : "text-gray-400"}`}>
                            <div className="font-medium">{step.date}</div>
                            <div>{step.time}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

                <div className={`rounded-lg p-6 mb-6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'}`}>
                  <h3 className="font-semibold mb-4 text-lg">Items Ordered</h3>
                  {orderStatus.items?.map((item, index) => (
                    <div key={index} className="flex items-center mb-4 last:mb-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="font-semibold text-lg">₹{item.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className={`rounded-lg p-6 mb-6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'}`}>
                  <h3 className="font-semibold mb-4 text-lg">Shipping Address</h3>
                  <div>
                    <p className="font-medium text-lg">{orderStatus.shippingAddress?.name}</p>
                    <p className="mt-1">{orderStatus.shippingAddress?.address}</p>
                    <p>{orderStatus.shippingAddress?.city} - {orderStatus.shippingAddress?.pincode}</p>
                    <p className="mt-2">📞 {orderStatus.shippingAddress?.phone}</p>
                  </div>
                </div>

                <div className={`rounded-lg p-6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'}`}>
                  <h3 className="font-semibold mb-4 text-lg">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Order Date:</span>
                      <span className="font-medium">{orderStatus.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tracking Number:</span>
                      <span className="font-medium text-cyan-500">{orderStatus.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Delivery:</span>
                      <span className="font-medium">{orderStatus.estimatedDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-semibold capitalize ${getStatusColor(orderStatus.status)}`}>
                        {orderStatus.status?.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center space-x-4">
              <button
                onClick={() => setOrderStatus(null)}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Track Another Order
              </button>
              <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;