import React from 'react';
import ServiceCommingSoon from '../ComingSoon/ServiceComingSoon';

// interface Order {
//     id: number;
//     customerName: string;
//     productName: string;
//     orderDate: string;
//     status: string;
// }

// const orders: Order[] = [
//     { id: 1, customerName: 'John Doe', productName: 'Laptop', orderDate: '2024-11-10', status: 'Shipped' },
//     { id: 2, customerName: 'Jane Smith', productName: 'T-shirt', orderDate: '2024-11-12', status: 'Pending' },
//     { id: 3, customerName: 'Michael Johnson', productName: 'Smartphone', orderDate: '2024-11-14', status: 'Delivered' },
//     { id: 4, customerName: 'Emily Davis', productName: 'Running Shoes', orderDate: '2024-11-15', status: 'Shipped' },
//     { id: 5, customerName: 'Chris Lee', productName: 'Smartwatch', orderDate: '2024-11-17', status: 'Pending' },
// ];

const ViewOrders = () => {
    return (
        <ServiceCommingSoon/>
        // <div className="min-h-screen bg-gray-100 p-6">
        //     <div className="container mx-auto max-w-7xl">
        //         {/* Header Section */}
        //         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        //             <div className="flex justify-between items-center">
        //                 <h1 className="text-2xl font-bold text-gray-800">Orders Overview</h1>
        //                 <div className="flex gap-4">
        //                     <div className="text-center">
        //                         <p className="text-sm text-gray-600">Total Orders</p>
        //                         <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
        //                     </div>
        //                     <div className="text-center">
        //                         <p className="text-sm text-gray-600">Pending</p>
        //                         <p className="text-2xl font-bold text-yellow-600">
        //                             {orders.filter(order => order.status === 'Pending').length}
        //                         </p>
        //                     </div>
        //                     <div className="text-center">
        //                         <p className="text-sm text-gray-600">Shipped</p>
        //                         <p className="text-2xl font-bold text-green-600">
        //                             {orders.filter(order => order.status === 'Shipped').length}
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Orders Table */}
        //         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        //             <div className="overflow-x-auto">
        //                 <table className="min-w-full divide-y divide-gray-200">
        //                     <thead className="bg-gray-50">
        //                         <tr>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
        //                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody className="divide-y divide-gray-200 bg-white">
        //                         {orders.map((order) => (
        //                             <tr key={order.id} className="hover:bg-gray-50 transition-colors">
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <span className="text-sm font-medium text-gray-900">#{order.id}</span>
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <div className="text-sm text-gray-900">{order.customerName}</div>
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <div className="text-sm text-gray-900">{order.productName}</div>
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <div className="text-sm text-gray-500">
        //                                         {new Date(order.orderDate).toLocaleDateString('en-US', {
        //                                             year: 'numeric',
        //                                             month: 'short',
        //                                             day: 'numeric'
        //                                         })}
        //                                     </div>
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
        //                                         ${order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
        //                                             order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        //                                                 'bg-blue-100 text-blue-800'}`}>
        //                                         {order.status}
        //                                     </span>
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm">
        //                                     <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
        //                                     <button className="text-gray-600 hover:text-gray-900">Edit</button>
        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ViewOrders;
