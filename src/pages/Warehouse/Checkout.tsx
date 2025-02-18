import React, { useState, useEffect } from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axiosInstance from '../../common/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Address from '../../components/Address/Address';

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
    const [manualAddress, setManualAddress] = useState('');

    // Calculate totals based on cart items
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.product.discountedPrice
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

    const handleOrderRequest = async () => {
        try {
            if (!manualAddress && !gstDetails?.address) {
                toast.error("Please provide a delivery address");
                return;
            }

            const productData = cartItems.map(item => ({
                productId: item.product._id,
                quantity: item.quantity,
                price: item.product.discountedPrice,
                brand: item.product.brand,
                category: item.product.category,
                subcategory: item.product.subcategory,
                title: item.product.title
            }));

            const totalDiscountedPrice = cartItems.reduce((total, item) => {
                return total + (item.product.discountedPrice * item.quantity);
            }, 0);

            const response = await axiosInstance.post("/api/payment/createOrderRequest", {
                amount: totalDiscountedPrice,
                items: productData,
                address: gstDetails?.address || manualAddress
            });

            if (response.data.success) {
                toast.success("Order request submitted successfully!");
                navigate('/orders');
            } else {
                toast.error(response.data.message || "Failed to submit order");
            }
        } catch (error: any) {
            console.error("Error submitting order request:", error);
            toast.error(error.response?.data?.message || "Error submitting order request");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-orange-500 mb-6">Checkout</h1>

            {/* Address Section */}
            {gstDetails?.address ? (
                <Address 
                    initialAddress={gstDetails.address}
                    onSave={setManualAddress}
                />
            ) : (
                <Address onSave={setManualAddress} />
            )}

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
                    onClick={handleOrderRequest}
                >
                    Submit Order Request
                </button>
            </div>
        </div>
    );
};

export default Checkout;