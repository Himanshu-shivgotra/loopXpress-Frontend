import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance.js';
import { Order } from '../../../../Backend/models/PaymentModel.js';
import { format } from 'date-fns';
import Loader from '../../common/Loader/index.js';
import { FaSearch } from 'react-icons/fa';

const CheckOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/api/orders');
                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                setError('Failed to fetch orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders based on search term and approval status
    const filteredOrders = orders.filter(order => 
        order.approvalStatus === 'Approved' &&
        (order.razorpay_order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.brand?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <Loader/>
    );
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between items-center mb-6'>
                <h1 className="text-3xl font-bold text-orange-500">All Orders</h1>
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
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredOrders.map((order) => (
                            <tr key={order.razorpay_order_id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{order.razorpay_order_id || "Not available"}</td>
                                <td className="px-4 py-3">{order.title}</td>
                                <td className="px-4 py-3">{order.brand}</td>
                                <td className="px-4 py-3">{order.category}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No orders found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOrders;