import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import { Order } from '../../../../Backend/models/PaymentModel';
import Loader from '../../common/Loader';
import { format } from 'date-fns';
import ServiceCommingSoon from '../ComingSoon/ServiceComingSoon';

const OrderStatus = () => {
    const role = localStorage.getItem('role');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        if (role !== 'admin') {
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/api/orders');
                if (response.data.success) {
                    const sortedOrders = sortOrdersByDate(response.data.orders, sortOrder);
                    setOrders(sortedOrders);
                }
            } catch (error) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [role, sortOrder]);

    const sortOrdersByDate = (orders: Order[], order: 'asc' | 'desc') => {
        const sorted = [...orders].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        return sorted;
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setOrders(prevOrders => {
            const sorted = sortOrdersByDate(prevOrders, order);
            console.log('Setting new sorted orders:', sorted);
            return sorted;
        });
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const response = await axiosInstance.put(`/api/orders/update/${orderId}`, {
                status: newStatus
            });

            if (response.data.success) {
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order.razorpay_order_id === orderId 
                            ? { ...order, status: newStatus } 
                            : order
                    )
                );
            }
        } catch (error) {
            alert('Failed to update order status');
        }
    };

    // Filter orders based on approval status
    const approvedOrders = orders.filter(order => 
        order.approvalStatus === 'Approved'
    );

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    if (role !== 'admin') {
        return <ServiceCommingSoon />;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-orange-500">Manage Order Status</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Sort by Date:</span>
                    <select
                        value={sortOrder}
                        onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc')}
                        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Current Status</th>
                            <th className="px-4 py-3">Update Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {approvedOrders.map((order, index) => (
                            <tr key={`${order.razorpay_order_id}-${index}-${order.createdAt}`} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{order.razorpay_order_id}</td>
                                <td className="px-4 py-3">{order.title}</td>
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
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.razorpay_order_id, e.target.value)}
                                        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Order Transit">Order Transit</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderStatus;