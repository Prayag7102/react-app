import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/CartCard';

const Cart = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]); 
  const shippingCost = 50; 
  const total = subtotal + shippingCost; 

  const navigate = useNavigate();

  const updateSubtotal = (newSubtotal, updatedCartItems) => {
    setSubtotal(newSubtotal);
    setCartItems(updatedCartItems);
  };
  const handleCheckout = () => {
    navigate('/profile/checkout', { state: { cartItems, subtotal, shippingCost, total } });
  };

  return (
    <div className="h-auto bg-gray-100 lg:p-20 md:p-12 sm:p-5 xxs:p-3">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <CartCard updateSubtotal={updateSubtotal} />
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">Rs.{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">Rs.{shippingCost.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">Rs.{total.toFixed(2)}</p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
