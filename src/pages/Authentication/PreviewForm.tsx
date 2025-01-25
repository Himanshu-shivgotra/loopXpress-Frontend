import React from "react";

interface PreviewFormProps {
    data: {
        personalDetails: any;
        businessDetails: {
            businessName: string;
            gstNumber: string;
            address?: string;
            brandName?: string;
            gstDetails?: {
                address?: string;
                legalName?: string;
                tradeName?: string;
            };
        };
        bankDetails: any;
    };
    onPrevious: () => void;
    onSubmit: () => void;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ data, onPrevious, onSubmit }) => {
    const { personalDetails, businessDetails, bankDetails } = data;

    return (
        <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto max-w-screen-sm shadow-default bg-white dark:border-strokedark dark:bg-boxdark p-4 sm:p-6 lg:p-8 rounded-md">
                <h2 className="text-center text-xl sm:text-2xl font-bold text-orange-500 mb-6">
                    Preview Your Details
                </h2>

                {/* Personal Details */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Full Name:</span>
                            <span>{personalDetails.fullName}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span>{personalDetails.email}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Phone Number:</span>
                            <span>{personalDetails.phoneNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Business Details */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Details</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Business Name:</span>
                            <span>{businessDetails.businessName}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Brand Name:</span>
                            <span>{businessDetails.brandName}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">GST Number:</span>
                            <span>{businessDetails.gstNumber}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Business Address:</span>
                            <span>{businessDetails.gstDetails?.address || businessDetails.address || 'Address not available'}</span>
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Details</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Bank Name:</span>
                            <span>{bankDetails.bankName}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Account Number:</span>
                            <span>{bankDetails.accountNumber}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Account Type:</span>
                            <span>{bankDetails.accountType}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">IFSC Code:</span>
                            <span>{bankDetails.ifscCode}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Branch Name:</span>
                            <span>{bankDetails.branchName}</span>
                        </div>
                        <div className="flex flex-col text-sm sm:text-base">
                            <span className="font-medium text-gray-600">Account Holder Name:</span>
                            <span>{bankDetails.accountHolderName}</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                    <button
                        onClick={onPrevious}
                        className="w-full sm:w-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                    >
                        Previous
                    </button>
                    <button
                        onClick={onSubmit}
                        className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewForm;
