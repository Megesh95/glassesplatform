import React, { useState } from "react";

const TrackOrderPage = () => {
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
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "shipped":
      case "out for delivery":
        return "text-blue-600";
      case "processing":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressPercentage = () => {
    if (!orderStatus?.timeline) return 0;
    const completedSteps = orderStatus.timeline.filter((step) => step.completed).length;
    return (completedSteps / orderStatus.timeline.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {!orderStatus ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Track Your Order</h1>
              <p className="text-gray-600 text-lg">Enter your order details to track your V-lens purchase</p>
            </div>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="orderNumber" className="block mb-3 text-gray-800 font-semibold text-lg">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., VL2024001234"
                    required
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-base transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-3 text-gray-800 font-semibold text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-base transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-500 text-white border-none p-4 rounded-lg text-lg font-semibold cursor-pointer hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Can't find your order number? Check your email confirmation or contact our support team.
                </p>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">Contact Support</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Status</h1>
              <p className="text-gray-600 text-lg">Order #{orderStatus.id}</p>
            </div>

            <div className="mb-12">
              <div className="bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Order Placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Timeline</h2>
                <div className="space-y-6">
                  {orderStatus.timeline?.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`w-5 h-5 rounded-full mt-1 mr-4 flex-shrink-0 ${
                          step.completed ? "bg-cyan-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`font-semibold text-lg ${step.completed ? "text-gray-800" : "text-gray-500"}`}
                            >
                              {step.status}
                            </h3>
                            <p className={`text-sm mt-1 ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                              {step.description}
                            </p>
                          </div>
                          <div className={`text-right text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">Items Ordered</h3>
                  {orderStatus.items?.map((item, index) => (
                    <div key={index} className="flex items-center mb-4 last:mb-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-gray-800 font-semibold text-lg">₹{item.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">Shipping Address</h3>
                  <div className="text-gray-600">
                    <p className="font-medium text-gray-800 text-lg">{orderStatus.shippingAddress?.name}</p>
                    <p className="mt-1">{orderStatus.shippingAddress?.address}</p>
                    <p>
                      {orderStatus.shippingAddress?.city} - {orderStatus.shippingAddress?.pincode}
                    </p>
                    <p className="mt-2">📞 {orderStatus.shippingAddress?.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">Order Information</h3>
                  <div className="text-gray-600 space-y-3">
                    <div className="flex justify-between">
                      <span>Order Date:</span>
                      <span className="font-medium">{orderStatus.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tracking Number:</span>
                      <span className="font-medium text-cyan-600">{orderStatus.trackingNumber}</span>
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