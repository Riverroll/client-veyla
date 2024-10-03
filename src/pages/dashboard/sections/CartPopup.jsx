import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../../../src/features/cart/cart';
import { ShoppingCart } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const CartPopup = ({ setIsPopupOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsPopupOpen(isOpen || isCheckoutModalOpen);
  }, [isOpen, isCheckoutModalOpen, setIsPopupOpen]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const safeParseFloat = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + safeParseFloat(item.product_price) * item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
      >
        <ShoppingCart className="mr-2" size={20} />
        Cart ({cartItems.length})
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-2 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.product_name}</span>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity} x IDR{safeParseFloat(item.product_price).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => handleAddToCart(item)} className="text-green-500 px-2 py-1">+</button>
                      <button onClick={() => handleRemoveFromCart(item)} className="text-red-500 px-2 py-1">-</button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <strong>Total: IDR{calculateTotal().toFixed(2)}</strong>
                </div>
                <div className="mt-4 flex justify-between">
                  <button onClick={handleClearCart} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-200">
                    Clear Cart
                  </button>
                  <button onClick={handleCheckout} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition duration-200">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
        cartItems={cartItems}
        total={calculateTotal()}
      />
    </div>
  );
};

export default CartPopup;