import React from 'react';

const ShoppingCart = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <a href="#" className="text-gray-600">&lt; Back</a>
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Cart Items Section */}
        
        <div className="flex-1">
          <div className="border-b border-gray-300 pb-4 mb-4">
          {myCart.map((item, index) => (
            <div className="flex justify-between items-center mb-4">
              <img src={item.image} alt={item.name}  className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h2 className="font-bold">{item.name}</h2>
                <p className="text-gray-500">50 mg</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrement(item.id)} className="text-gray-500">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => increment(item.id)} className="text-gray-500">+</button>
              </div>
              <p className="font-bold">{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemove(item.id)} className="text-gray-500">X</button>
            </div>
             ))}
            <div className="flex justify-between items-center mb-4">
              <img src="https://via.placeholder.com/80" alt="Product 2" className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h2 className="font-bold">Water Soluble CBD Powder</h2>
                <p className="text-gray-500">100 mg</p>
                <p className="text-gray-500">{myCart.reduce((total, item) => total + item.quantity, 0)}</p>
              </div>
              <p className="font-bold">{myCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
              <button className="text-gray-500">X</button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Coupon code" className="w-1/2 border border-gray-300 rounded p-2" />
            <button className="bg-gray-800 text-white px-4 py-2 rounded ml-2">Apply</button>
          </div>
        </div>
        {/* Cart Totals Section */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded">
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>$100.00</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Tax</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between font-bold mb-4">
            <p>Total</p>
            <p>$100.00</p>
          </div>
          <button onClick={openCheckoutPopup} className="bg-black text-white w-full py-2 rounded">Proceed to Checkout</button>
          <a href="#" className="block text-center text-gray-600 mt-4">Continue Shopping</a>
        </div>
      </div>
      
    </div>
  );
};

export default ShoppingCart;