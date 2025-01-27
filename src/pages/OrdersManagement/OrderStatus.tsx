import React, { useState } from 'react';
import ServiceCommingSoon from '../ComingSoon/ServiceComingSoon';

// enum OrderStatus {
//     PENDING = 'Pending',
//     SHIPPED = 'Shipped',
//     DELIVERED = 'Delivered',
//     CANCELLED = 'Cancelled'
// }

// interface Order {
//     id: number;
//     customerName: string;
//     productName: string;
//     orderDate: string;
//     status: OrderStatus;
//     address?: string;
//     paymentMethod?: string;
//     totalAmount?: number;
// }

// const orders: Order[] = [
//     { id: 1, customerName: 'John Doe', productName: 'Laptop', orderDate: '2024-11-10', status: OrderStatus.SHIPPED, address: '123 Main St, City', paymentMethod: 'Credit Card', totalAmount: 999.99 },
//     { id: 2, customerName: 'Jane Smith', productName: 'T-shirt', orderDate: '2024-11-12', status: OrderStatus.PENDING, address: '456 Oak Ave, Town', paymentMethod: 'PayPal', totalAmount: 29.99 },
//     { id: 3, customerName: 'Michael Johnson', productName: 'Smartphone', orderDate: '2024-11-14', status: OrderStatus.DELIVERED, address: '789 Pine Rd, Village', paymentMethod: 'Debit Card', totalAmount: 699.99 },
//     { id: 4, customerName: 'Emily Davis', productName: 'Running Shoes', orderDate: '2024-11-15', status: OrderStatus.SHIPPED, address: '321 Elm St, County', paymentMethod: 'Credit Card', totalAmount: 89.99 },
//     { id: 5, customerName: 'Chris Lee', productName: 'Smartwatch', orderDate: '2024-11-17', status: OrderStatus.PENDING, address: '654 Maple Dr, State', paymentMethod: 'PayPal', totalAmount: 199.99 },
// ];

const OrderStatusPage = () => {
    return (
        <ServiceCommingSoon />
    )
    //     const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    //     const [newStatus, setNewStatus] = useState<string>('');
    //     const [currentPage, setCurrentPage] = useState(1);
    //     const ordersPerPage = 10;

    //     const handleStatusChange = (orderId: number) => {
    //         if (!newStatus) return;
    //     };

    //     const getStatusColor = (status: string) => {
    //         switch (status.toLowerCase()) {
    //             case 'delivered': return 'bg-green-100 text-green-800';
    //             case 'shipped': return 'bg-blue-100 text-blue-800';
    //             case 'cancelled': return 'bg-red-100 text-red-800';
    //             default: return 'bg-yellow-100 text-yellow-800';
    //         }
    //     };

    //     const paginatedOrders = orders.slice(
    //         (currentPage - 1) * ordersPerPage,
    //         currentPage * ordersPerPage
    //     );

    //     return (
    //         <div className="min-h-screen bg-gray-100 p-6">
    //             <div className="container mx-auto max-w-7xl">
    //                 {/* Header Section */}
    //                 <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
    //                     <div className="flex justify-between items-center">
    //                         <h1 className="text-2xl font-bold text-gray-800">Order Status Management</h1>
    //                         <div className="flex gap-6">
    //                             <div className="text-center">
    //                                 <p className="text-sm text-gray-600">Total Orders</p>
    //                                 <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
    //                             </div>
    //                             <div className="text-center">
    //                                 <p className="text-sm text-gray-600">Pending</p>
    //                                 <p className="text-2xl font-bold text-yellow-600">
    //                                     {orders.filter(order => order.status === OrderStatus.PENDING).length}
    //                                 </p>
    //                             </div>
    //                             <div className="text-center">
    //                                 <p className="text-sm text-gray-600">Shipped</p>
    //                                 <p className="text-2xl font-bold text-blue-600">
    //                                     {orders.filter(order => order.status === OrderStatus.SHIPPED).length}
    //                                 </p>
    //                             </div>
    //                             <div className="text-center">
    //                                 <p className="text-sm text-gray-600">Delivered</p>
    //                                 <p className="text-2xl font-bold text-green-600">
    //                                     {orders.filter(order => order.status === OrderStatus.DELIVERED).length}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* Main Content */}
    //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //                     {/* Orders List */}
    //                     <div className="md:col-span-2">
    //                         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    //                             <div className="overflow-x-auto">
    //                                 <table className="min-w-full divide-y divide-gray-200">
    //                                     <thead className="bg-gray-50">
    //                                         <tr>
    //                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
    //                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
    //                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
    //                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
    //                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody className="bg-white divide-y divide-gray-200">
    //                                         {paginatedOrders.map((order) => (
    //                                             <tr key={order.id} className="hover:bg-gray-50">
    //                                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //                                                     #{order.id}
    //                                                 </td>
    //                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                                                     {order.customerName}
    //                                                 </td>
    //                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                                                     {order.productName}
    //                                                 </td>
    //                                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
    //                                                         {order.status}
    //                                                     </span>
    //                                                 </td>
    //                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                                                     <button
    //                                                         onClick={() => setSelectedOrder(order)}
    //                                                         className="text-blue-600 hover:text-blue-900 font-medium"
    //                                                     >
    //                                                         Update Status
    //                                                     </button>
    //                                                 </td>
    //                                             </tr>
    //                                         ))}
    //                                     </tbody>
    //                                 </table>
    //                                 <div className="px-6 py-3 flex justify-between items-center border-t">
    //                                     <button
    //                                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    //                                         disabled={currentPage === 1}
    //                                         className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
    //                                     >
    //                                         Previous
    //                                     </button>
    //                                     <span>Page {currentPage}</span>
    //                                     <button
    //                                         onClick={() => setCurrentPage(prev => prev + 1)}
    //                                         disabled={currentPage * ordersPerPage >= orders.length}
    //                                         className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
    //                                     >
    //                                         Next
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     {/* Order Details and Status Update */}
    //                     <div className="md:col-span-1">
    //                         <div className="bg-white rounded-xl shadow-lg p-6">
    //                             <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h2>
    //                             {selectedOrder ? (
    //                                 <div className="space-y-4">
    //                                     <div className="bg-gray-50 p-4 rounded-lg">
    //                                         <h3 className="font-medium text-gray-800">Customer Information</h3>
    //                                         <p className="text-sm text-gray-600 mt-1">{selectedOrder.customerName}</p>
    //                                         <p className="text-sm text-gray-600 mt-1">{selectedOrder.address}</p>
    //                                     </div>

    //                                     <div className="bg-gray-50 p-4 rounded-lg">
    //                                         <h3 className="font-medium text-gray-800">Order Information</h3>
    //                                         <p className="text-sm text-gray-600 mt-1">Product: {selectedOrder.productName}</p>
    //                                         <p className="text-sm text-gray-600">Amount: ${selectedOrder.totalAmount?.toFixed(2)}</p>
    //                                         <p className="text-sm text-gray-600">Payment: {selectedOrder.paymentMethod}</p>
    //                                     </div>

    //                                     <div className="bg-gray-50 p-4 rounded-lg">
    //                                         <h3 className="font-medium text-gray-800">Current Status</h3>
    //                                         <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
    //                                             {selectedOrder.status}
    //                                         </span>
    //                                     </div>

    //                                     <div className="space-y-2">
    //                                         <label className="block text-sm font-medium text-gray-700">
    //                                             Update Status
    //                                         </label>
    //                                         <select
    //                                             value={newStatus}
    //                                             onChange={(e) => setNewStatus(e.target.value)}
    //                                             className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //                                         >
    //                                             <option value="">Select Status</option>
    //                                             {Object.values(OrderStatus).map(status => (
    //                                                 <option key={status} value={status}>{status}</option>
    //                                             ))}
    //                                         </select>
    //                                         <button
    //                                             onClick={() => handleStatusChange(selectedOrder.id)}
    //                                             disabled={!newStatus}
    //                                             className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    //                                         >
    //                                             Update Status
    //                                         </button>
    //                                     </div>
    //                                 </div>
    //                             ) : (
    //                                 <p className="text-gray-500 text-center">Select an order to update its status</p>
    //                             )}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
};

export default OrderStatusPage;
