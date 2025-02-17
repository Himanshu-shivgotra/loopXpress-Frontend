import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    _id: string;
    product: {
        _id: string;
        title: string;
        imageUrls: string[];
        price: number;
        brand: string;
        category: string;
        discountedPrice: number;
        originalPrice: number;
        quantity: number;
    };
    quantity: number;
}

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get('/api/inventory/get-cart');
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async (itemId: string) => {
        try {
            await axiosInstance.delete(`/api/inventory/cart/${itemId}`);
            setCartItems(prev => prev.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleIncreaseQuantity = async (itemId: string) => {
        try {
            const response = await axiosInstance.put(`/api/inventory/cart/${itemId}/increase`);
            setCartItems(prev =>
                prev.map(item =>
                    item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecreaseQuantity = async (itemId: string) => {
        try {
            const response = await axiosInstance.put(`/api/inventory/cart/${itemId}/decrease`);
            setCartItems(prev =>
                prev.map(item =>
                    item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product.discountedPrice || 0;
            return total + price * item.quantity;
        }, 0);
    };

    const handleCheckout = async () => {
        navigate('/checkout', { state: { cartItems } });
    }


    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                {/* Product Image */}
                                <img
                                    src={item.product.imageUrls[0]}
                                    alt={item.product.title}
                                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                                />
                                {/* Product Details */}
                                <div className="flex-1 md:ml-6 mt-4 md:mt-0">
                                    <h3 className="text-lg font-semibold text-orange-500">{item.product.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.product.brand}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Category: {item.product.category}</p>
                                    <div className="flex gap-2 mt-2">
                                        <p className="text-sm text-gray-500 line-through">₹{item.product.originalPrice}</p>
                                        <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">₹{item.product.discountedPrice}</p>
                                    </div>
                                </div>
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDecreaseQuantity(item._id)}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <FaMinus size={14} className="dark:text-gray-100" />
                                        </button>
                                        <span className="text-lg font-semibold dark:text-gray-100">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item._id)}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <FaPlus size={14} className="dark:text-gray-100" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-semibold dark:text-gray-100">₹{calculateTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-semibold dark:text-gray-100">₹0</span>
                            </div>
                            <div className="flex justify-between border-t pt-3 border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Total</span>
                                <span className="font-semibold text-orange-500">₹{calculateTotalPrice()}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;