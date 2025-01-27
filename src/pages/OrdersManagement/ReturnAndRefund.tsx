import React, { useState } from 'react';
import ServiceCommingSoon from '../ComingSoon/ServiceComingSoon';

// interface ReturnRequest {
//     id: number;
//     customerName: string;
//     productName: string;
//     orderDate: string;
//     requestDate: string;
//     status: string;
//     reason?: string;
// }

// const returnRequests: ReturnRequest[] = [
//     { id: 1, customerName: 'John Doe', productName: 'Laptop', orderDate: '2024-11-10', requestDate: '2024-11-15', status: 'Pending', reason: 'Defective product' },
//     { id: 2, customerName: 'Jane Smith', productName: 'T-shirt', orderDate: '2024-11-12', requestDate: '2024-11-16', status: 'Approved', reason: 'Wrong size' },
//     { id: 3, customerName: 'Michael Johnson', productName: 'Smartphone', orderDate: '2024-11-14', requestDate: '2024-11-18', status: 'Pending', reason: 'Not as described' },
//     { id: 4, customerName: 'Emily Davis', productName: 'Running Shoes', orderDate: '2024-11-15', requestDate: '2024-11-20', status: 'Rejected', reason: 'Outside return window' },
//     { id: 5, customerName: 'Chris Lee', productName: 'Smartwatch', orderDate: '2024-11-17', requestDate: '2024-11-19', status: 'Approved', reason: 'Changed mind' },
// ];

const ReturnAndRefund = () => {
    // const [selectedRequest, setSelectedRequest] = useState<ReturnRequest | null>(null);
    // const [newStatus, setNewStatus] = useState<string>('');

    // const handleStatusChange = (requestId: number) => {
    //     if (!newStatus) return;
    //     // Update status logic here
    // };

    // const getStatusColor = (status: string) => {
    //     switch (status.toLowerCase()) {
    //         case 'approved': return 'bg-green-100 text-green-800';
    //         case 'rejected': return 'bg-red-100 text-red-800';
    //         default: return 'bg-yellow-100 text-yellow-800';
    //     }
    // };

    return (
        <ServiceCommingSoon />
        //     <div className="min-h-screen bg-gray-100 p-6">
        //         <div className="container mx-auto max-w-7xl">
        //             {/* Header Section */}
        //             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        //                 <div className="flex justify-between items-center">
        //                     <h1 className="text-2xl font-bold text-gray-800">Return & Refund Requests</h1>
        //                     <div className="flex gap-6">
        //                         <div className="text-center">
        //                             <p className="text-sm text-gray-600">Total Requests</p>
        //                             <p className="text-2xl font-bold text-blue-600">{returnRequests.length}</p>
        //                         </div>
        //                         <div className="text-center">
        //                             <p className="text-sm text-gray-600">Pending</p>
        //                             <p className="text-2xl font-bold text-yellow-600">
        //                                 {returnRequests.filter(req => req.status === 'Pending').length}
        //                             </p>
        //                         </div>
        //                         <div className="text-center">
        //                             <p className="text-sm text-gray-600">Approved</p>
        //                             <p className="text-2xl font-bold text-green-600">
        //                                 {returnRequests.filter(req => req.status === 'Approved').length}
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Main Content */}
        //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        //                 {/* Requests List */}
        //                 <div className="md:col-span-2">
        //                     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        //                         <div className="overflow-x-auto">
        //                             <table className="min-w-full divide-y divide-gray-200">
        //                                 <thead className="bg-gray-50">
        //                                     <tr>
        //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
        //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
        //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
        //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody className="bg-white divide-y divide-gray-200">
        //                                     {returnRequests.map((request) => (
        //                                         <tr key={request.id} className="hover:bg-gray-50">
        //                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        //                                                 #{request.id}
        //                                             </td>
        //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //                                                 {request.customerName}
        //                                             </td>
        //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //                                                 {request.productName}
        //                                             </td>
        //                                             <td className="px-6 py-4 whitespace-nowrap">
        //                                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
        //                                                     {request.status}
        //                                                 </span>
        //                                             </td>
        //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //                                                 <button
        //                                                     onClick={() => setSelectedRequest(request)}
        //                                                     className="text-blue-600 hover:text-blue-900 font-medium"
        //                                                 >
        //                                                     View Details
        //                                                 </button>
        //                                             </td>
        //                                         </tr>
        //                                     ))}
        //                                 </tbody>
        //                             </table>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 {/* Request Details */}
        //                 <div className="md:col-span-1">
        //                     <div className="bg-white rounded-xl shadow-lg p-6">
        //                         <h2 className="text-lg font-semibold text-gray-800 mb-4">Request Details</h2>
        //                         {selectedRequest ? (
        //                             <div className="space-y-4">
        //                                 <div className="bg-gray-50 p-4 rounded-lg">
        //                                     <h3 className="font-medium text-gray-800">Customer Information</h3>
        //                                     <p className="text-sm text-gray-600 mt-1">{selectedRequest.customerName}</p>
        //                                 </div>

        //                                 <div className="bg-gray-50 p-4 rounded-lg">
        //                                     <h3 className="font-medium text-gray-800">Product</h3>
        //                                     <p className="text-sm text-gray-600 mt-1">{selectedRequest.productName}</p>
        //                                 </div>

        //                                 <div className="bg-gray-50 p-4 rounded-lg">
        //                                     <h3 className="font-medium text-gray-800">Dates</h3>
        //                                     <p className="text-sm text-gray-600 mt-1">
        //                                         Order: {new Date(selectedRequest.orderDate).toLocaleDateString()}
        //                                     </p>
        //                                     <p className="text-sm text-gray-600">
        //                                         Request: {new Date(selectedRequest.requestDate).toLocaleDateString()}
        //                                     </p>
        //                                 </div>

        //                                 <div className="bg-gray-50 p-4 rounded-lg">
        //                                     <h3 className="font-medium text-gray-800">Reason</h3>
        //                                     <p className="text-sm text-gray-600 mt-1">{selectedRequest.reason}</p>
        //                                 </div>

        //                                 <div className="space-y-2">
        //                                     <label className="block text-sm font-medium text-gray-700">
        //                                         Update Status
        //                                     </label>
        //                                     <select
        //                                         value={newStatus}
        //                                         onChange={(e) => setNewStatus(e.target.value)}
        //                                         className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        //                                     >
        //                                         <option value="">Select Status</option>
        //                                         <option value="Pending">Pending</option>
        //                                         <option value="Approved">Approved</option>
        //                                         <option value="Rejected">Rejected</option>
        //                                     </select>
        //                                     <button
        //                                         onClick={() => handleStatusChange(selectedRequest.id)}
        //                                         disabled={!newStatus}
        //                                         className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        //                                     >
        //                                         Update Status
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         ) : (
        //                             <p className="text-gray-500 text-center">Select a request to view details</p>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
    );
};

export default ReturnAndRefund;
