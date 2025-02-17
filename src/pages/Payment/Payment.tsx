import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
    };
  }
}

const Payment = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/orders/${orderId}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error("Error fetching order details:", error);
                toast.error("Failed to load order details");
                navigate('/approved-orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, navigate]);

    const handlePayment = async () => {
        try {
            const { data } = await axiosInstance.post('/api/payment/checkout', {
                amount: order.amount
            });

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "Your Company Name",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    await axiosInstance.post('/api/payment/verification', {
                        ...response,
                        orderId: order._id
                    });
                    toast.success("Payment successful!");
                    navigate('/orders');
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#F37254"
                }
            };

            const razorpay = new window.Razorpay(options)
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment failed");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Payment</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                    <p>Order ID: {order._id}</p>
                    <p>Amount: ₹{order.amount}</p>
                </div>
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