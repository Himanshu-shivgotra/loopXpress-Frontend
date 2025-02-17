import React, { useState, useEffect } from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axiosInstance from '../../common/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface CartItem {
    _id: string;
    product: {
        _id: string;
        title: string;
        price: number;
        discountedPrice: number;
        quantity: number;
        brand: string;
        category: string;
        subcategory: string;
    };
    quantity: number;
}

const Checkout = () => {
    const navigate = useNavigate();
    const { userInfo, loading, error } = useUserInfo();
    const [gstDetails, setGstDetails] = useState<any>(null);
    const [isVerifyingGst, setIsVerifyingGst] = useState(false);
    const location = useLocation();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    // Calculate totals based on cart items
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.product.discountedPrice || item.product.price;
        return total + price * item.quantity;
    }, 0);

    const shippingFee = 0;
    const totalAmount = totalPrice + shippingFee;

    useEffect(() => {
        if (location.state?.cartItems) {
            setCartItems(location.state.cartItems);
        }
    }, [location.state]);

    const fetchRazorPayKey = async () => {
        const response = await axiosInstance.get("/api/getkey");
        return response.data.key;
    }
    const verifyGstNumber = async (gstNumber: string) => {
        setIsVerifyingGst(true);
        try {
            const response = await axiosInstance.post("/api/gst/verify-gst", {
                gstin: gstNumber,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = response.data;
            if (result.success && result.data) {
                setGstDetails(result.data);
            }
        } catch (error) {
            console.error("Error verifying GST:", error);
        } finally {
            setIsVerifyingGst(false);
        }
    };

    useEffect(() => {
        if (userInfo?.businessDetails?.gstNumber) {
            verifyGstNumber(userInfo.businessDetails.gstNumber);
        }
    }, [userInfo?.businessDetails?.gstNumber]);

    const handlePayment = async () => {
        try {
            const orderResponse = await axiosInstance.post("/api/payment/checkout", {
                amount: totalAmount,
            });

            const { order } = orderResponse.data;
            if (!order) {
                console.error("Order creation failed.");
                return;
            }

            // Load Razorpay script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = async () => {
                const key = await fetchRazorPayKey();
                const productData = cartItems.map(item => ({
                    title: item.product?.title,
                    brand: item.product?.brand,
                    category: item.product.category,
                    discountedPrice: item.product.discountedPrice,
                    subcategory: item.product.subcategory 
                }));

                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    order_id: order.id,
                    name: "Loopxpress",
                    description: "Order Payment",
                    image: "https://loop-xpress-eller-frontend.vercel.app/assets/Adrenal_Go_logo-e621edde.png",
                    handler: async (response) => {
                        const paymentData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: order.amount / 100,
                            currency: "INR",
                            items: productData
                        };

                        try {
                            const paymentResponse = await axiosInstance.post(
                                "/api/payment/paymentverification",
                                paymentData
                            );

                            if (paymentResponse.data.success) {
                                // Clear the cart after successful payment
                                await axiosInstance.delete('/api/inventory/clear-cart');
                                
                                toast.success("Payment successful! Redirecting...");
                                setTimeout(() => {
                                    navigate('/inventory')
                                }, 1000);
                            } else {
                                toast.error("Payment verification failed");
                            }
                        } catch (verificationError) {
                            console.error("Verification error:", verificationError);
                            toast.error("Payment verification error");
                        }
                    },
                    prefill: {
                        name: userInfo?.businessDetails?.businessName,
                        email: userInfo?.personalDetails?.email || '',
                        contact: userInfo?.businessDetails?.businessPhone
                    },
                    notes: {
                        address: `${gstDetails?.address}`,
                    },
                    theme: {
                        color: "#FF5722"
                    }
                };

                const razorpay = new (window as any).Razorpay(options);
                razorpay.on('payment.failed', function (response: any) {
                    toast.error(`Payment failed: ${response.error.description}`);
                });
                razorpay.open();
            };
            document.body.appendChild(script);
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Error during checkout process");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Checkout</h1>

            {/* Delivery Address Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    Delivery Address
                </h2>
                {loading ? (
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error.message}</p>
                ) : (
                    <div className="text-gray-700 dark:text-gray-300">
                        <p className="font-semibold">{userInfo?.businessDetails.businessName}</p>
                        <p>Phone: {userInfo?.businessDetails.businessPhone}</p>
                        {gstDetails && (
                            <p><strong>Address:</strong> {gstDetails.address || "Adress not found"}</p>
                        )}
                    </div>
                )}
                <button
                    className="mt-4 text-orange-500 hover:text-orange-600 underline"
                    onClick={() => {/* Open address edit modal */ }}
                >
                    Edit Address
                </button>
            </div>

            {/* Payment Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Payment Details</h2>

                {/* Order Summary */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="font-semibold dark:text-gray-100">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                        <span className="font-semibold dark:text-gray-100">₹{shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 border-gray-200 dark:border-gray-700">
                        <span className="text-lg text-gray-900 dark:text-gray-100">Total</span>
                        <span className="text-lg font-bold text-orange-500">₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={handlePayment}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;