import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import Loader from '../../common/Loader';

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

const OrderRequests = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        approvalStatus: 'Pending',
        minAmount: '',
        maxAmount: '',
        dateRange: {
            start: '',
            end: ''
        }
    });

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axiosInstance.get('/api/orders?status=Pending');
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, []);

    const handleApproveOrder = async (orderId: string) => {
        try {
            await axiosInstance.put(`/api/payment/approveOrder/${orderId}`);
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, approvalStatus: 'Approved' } : order
            ));
        } catch (error) {
            console.error("Error approving order:", error);
        }
    };

    const handleRejectOrder = async (orderId: string) => {
        try {
            await axiosInstance.put(`/api/payment/rejectOrder/${orderId}`);
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, approvalStatus: 'Rejected' } : order
            ));
        } catch (error) {
            console.error("Error rejecting order:", error);
        }
    };

    const filterOrders = (orders: Order[]) => {
        return orders.filter(order => {
            const matchesStatus = order.approvalStatus === filters.approvalStatus;
            const matchesMinAmount = !filters.minAmount || order.discountedPrice >= Number(filters.minAmount);
            const matchesMaxAmount = !filters.maxAmount || order.discountedPrice <= Number(filters.maxAmount);
            const matchesDateRange = (
                (!filters.dateRange.start || new Date(order.createdAt) >= new Date(filters.dateRange.start)) &&
                (!filters.dateRange.end || new Date(order.createdAt) <= new Date(filters.dateRange.end))
            );
            
            return matchesStatus && matchesMinAmount && matchesMaxAmount && matchesDateRange;
        });
    };

    const filteredOrders = filterOrders(orders);
    
    const columns = [
        {
            header: 'Product',
            accessor: (order) => order.title
        },
        {
            header: 'Brand',
            accessor: (order) => order.brand
        },
        {
            header: 'Category',
            accessor: (order) => order.category
        },
        {
            header: 'Amount',
            accessor: (order) => `₹${order.amount}`
        },
        {
            header: 'Discounted Price',
            accessor: (order) => `₹${order.discountedPrice}`
        },
        {
            header: 'Payment Status',
            accessor: (order) => (
                <span className={`px-2 py-1 rounded-full text-sm ${
                    order.razorpay_order_id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {order.razorpay_order_id ? 'Paid' : 'Pending'}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (order) => (
                <div className="flex space-x-2">
                    {order.approvalStatus === 'Pending' ? (
                        <>
                            <button
                                onClick={() => handleApproveOrder(order._id)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleRejectOrder(order._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <span className={`px-3 py-1 rounded-md text-sm 
                            ${order.approvalStatus === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {order.approvalStatus}
                        </span>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">Order Requests</h1>
            
            {/* Filter Controls */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white">Approval Status</label>
                        <select
                            value={filters.approvalStatus}
                            onChange={(e) => setFilters({ ...filters, approvalStatus: e.target.value })}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <Loader/>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index} className="px-4 py-3">{column.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredOrders.map(order => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    {columns.map((column, index) => (
                                        <td key={index} className="px-4 py-3">{column.accessor(order)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderRequests;