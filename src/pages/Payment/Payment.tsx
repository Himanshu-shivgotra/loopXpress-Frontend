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
            if (!order) {
                toast.error("Order details not found");
                return;
            }

            const amount = (order.amount * 100);
            const key = await fetchRazorpayKey();

            // Create Razorpay order first
            const { data } = await axiosInstance.post('/api/payment/checkout', {
                orderId: order._id,
                amount: amount
            });

            const options = {
                key,
                amount: amount,
                currency: "INR",
                name: "Loop Xpress International",
                description: "Order Payment",
                image:"https://loop-xpress-eller-frontend.vercel.app/assets/Adrenal_Go_logo-e621edde.png",
                order_id: data.order.id, // Use the generated order ID
                handler: async function (response) {
                    try {
                        // Verify payment with all required fields
                        const verificationResponse = await axiosInstance.post('/api/payment/paymentVerification', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: order._id,
                            amount: amount
                        });

                        if (verificationResponse.data.success) {
                            await axiosInstance.delete('/api/inventory/clear-cart');
                            toast.success("Payment successful!");
                            navigate('/inventory');
                        } else {
                            throw new Error("Payment verification failed");
                        }
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
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Order ID:</p>
                                <p>{order._id}</p>
                            </div>
                            <div>
                                <p className="font-medium">Title:</p>
                                <p>{order.title}</p>
                            </div>
                            <div>
                                <p className="font-medium">Amount:</p>
                                <p>₹{order.amount}</p>
                            </div>
                            <div>
                                <p className="font-medium">Status:</p>
                                <p className={`capitalize ${order.status === 'pending' ? 'text-orange-500' : 'text-green-500'}`}>
                                    {order.status}
                                </p>
                            </div>
                        </div>
                        {order.items && (
                            <div className="mt-4">
                                <h3 className="font-medium mb-2">Items:</h3>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between border-b pb-2">
                                            <div>
                                                <p>{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p>₹{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button
                    onClick={handlePayment}
                    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Payment; 