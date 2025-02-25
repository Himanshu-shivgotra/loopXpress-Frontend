import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import { format } from 'date-fns';
import Loader from '../../common/Loader';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export interface Order {
    _id: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    amount: number;
    discountedPrice: number;
    currency: string;
    title: string;
    brand: string;
    category: string;
    subcategory: string;
    status?: string;
    approvalStatus: 'Pending' | 'Approved' | 'Rejected';
    createdAt?: Date;
}

const ApprovedOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedOrders = async () => {
            try {
                const response = await axiosInstance.get('/api/orders?status=Approved');
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching approved orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedOrders();
    }, []);

    const handleMakePayment = async (orderId: string) => {
        try {
            // Verify the order is approved
            const response = await axiosInstance.get(`/api/payment/order/${orderId}`);
            const order = response.data.order;
            
            if (order.approvalStatus !== 'Approved') {
                toast.error("Order is not approved for payment");
                return;
            }

            // Navigate to payment page with existing order data
            navigate(`/payment/${orderId}`, {
                state: {
                    orderData: order 
                }
            });
        } catch (error) {
            console.error("Error verifying order:", error);
            toast.error("Failed to process payment");
        }
    };

    const filteredOrders = orders
        .filter(order => 
            order.approvalStatus === 'Approved' &&
            (order.razorpay_order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.brand?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Descending order (newest first)
        });

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between items-center mb-6'>
                <h1 className="text-3xl font-bold text-orange-500">Approved Orders</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Order ID, Product, or Brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-96"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{order.razorpay_order_id || 'N/A'}</td>
                                <td className="px-4 py-3">{order.title}</td>
                                <td className="px-4 py-3">{order.brand}</td>
                                <td className="px-4 py-3">₹{order.discountedPrice}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
                                </td>
                                <td className="px-4 py-3">
                                    {!order.razorpay_order_id && (
                                        <button
                                            onClick={() => handleMakePayment(order._id)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                                        >
                                            Make Payment
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No approved orders found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovedOrders; 