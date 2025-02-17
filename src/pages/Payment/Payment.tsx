import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';
import useUserInfo from '../../hooks/useUserInfo';


declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
    };
  }
}

const Payment = () => {
    const { userInfo } = useUserInfo();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    

    const fetchRazorpayKey = async () => {
        const response = await axiosInstance.get("/api/getkey");
        return response.data.key;
    };

    useEffect(() => {
        const initializePayment = async () => {
            try {
                // Get order details from state
                const orderData = (location.state as { orderData: any })?.orderData;
                if (!orderData) {
                    throw new Error("Order data not found");
                }

                // Use the existing order instead of creating a new one
                setOrder(orderData);
            } catch (error) {
                console.error("Error initializing payment:", error);
                toast.error("Failed to initialize payment");
                navigate('/approved-orders');
            } finally {
                setLoading(false);
            }
        };

        initializePayment();
    }, [orderId, navigate, location.state]);
    

    const handlePayment = async () => {
        
        try {
            // Add validation for order existence
            if (!order) {
                toast.error("Order details not found");
                return;
            }

            const amount =(order.amount * 100);
            const { data } = await axiosInstance.post('/api/payment/checkout', {
                orderId: order._id,
                amount: amount
            });

            // Add debug logging for Razorpay response
            console.log("Razorpay response:", data);

            const key = await fetchRazorpayKey();
            const options = {
                key,
                amount: amount,
                currency: "INR",
                name: "Loop Xpress International",
                description: "Order Payment",
                image:"https://loop-xpress-eller-frontend.vercel.app/assets/Adrenal_Go_logo-e621edde.png",
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        await axiosInstance.post('/api/payment/paymentVerification', {
                            ...response,
                            orderId: order._id,
                            amount: amount
                        });

                        // Clear the cart after successful payment
                        await axiosInstance.delete('/api/inventory/clear-cart');
                        
                        toast.success("Payment successful!");
                        navigate('/inventory');
                    } catch (error) {
                        console.error("Payment verification error:", error);
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: userInfo?.personalDetails?.fullName,
                    email: userInfo?.personalDetails?.email,
                    contact: userInfo?.personalDetails?.phoneNumber,
                },
                theme: {
                    color: "#F37254"
                },
                modal: {
                    ondismiss: function() {
                        console.log("Payment modal dismissed");
                        toast.error("Payment cancelled by user");
                    }
                }
            };

            // Check if Razorpay is loaded
            if (!window.Razorpay) {
                throw new Error("Razorpay script not loaded");
            }

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(`Payment failed: ${error.message}`);
        }
    };

    if (loading) return (<Loader/>);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Payment</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {order && (
                    <div className="space-y-2">
                        <p>Order ID: {order._id}</p>
                        <p>Amount: ₹{order.amount}</p>
                    </div>
                )}
                <button
                    onClick={handlePayment}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Payment; 