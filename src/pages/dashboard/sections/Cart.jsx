import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../../../src/features/cart/cart';

const CartPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cart ({cartItems.length})
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-2">
                    <span>{item.name}</span>
                    <span className="ml-2">Quantity: {item.quantity}</span>
                    <span className="ml-2">Price: ${Number(item.price).toFixed(2)}</span>
                    <button onClick={() => handleAddToCart(item)} className="ml-2 text-green-500">+</button>
                    <button onClick={() => handleRemoveFromCart(item)} className="ml-2 text-red-500">-</button>
                  </div>
                ))}
                <div className="mt-4">
                  <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                </div>
                <button onClick={handleClearCart} className="mt-4 bg-red-500 text-white px-2 py-1 rounded">Clear Cart</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;