import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface AddressProps {
    initialAddress?: string;
    onSave: (address: string) => void;
    onCancel?: () => void;
}

interface AddressFields {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

const parseAddressString = (address: string): AddressFields => {
    const parts = address.split(', ');
    return {
        line1: parts[0] || '',
        line2: parts[1] || '',
        city: parts[2] || '',
        state: parts[3] || '',
        pincode: parts[4] || '',
        country: parts[5] || 'India'
    };
};

const Address = ({ initialAddress = '', onSave, onCancel }: AddressProps) => {
    const [currentAddress, setCurrentAddress] = useState(initialAddress);
    const initialFields = currentAddress ? parseAddressString(currentAddress) : {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
    };

    const [addressFields, setAddressFields] = useState<AddressFields>(initialFields);
    const [isEditing, setIsEditing] = useState(!currentAddress);

    const handleSave = () => {
        const addressString = formatAddressString(addressFields);
        setCurrentAddress(addressString);
        onSave(addressString);
        setIsEditing(false);
    };

    const formatAddressString = (fields: AddressFields): string => {
        return `${fields.line1}, ${fields.line2}, ${fields.city}, ${fields.state} - ${fields.pincode}, ${fields.country}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                Delivery Address
            </h2>
            {isEditing ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Address Line 1"
                        value={addressFields.line1}
                        onChange={(e) => setAddressFields({...addressFields, line1: e.target.value})}
                    />
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Address Line 2"
                        value={addressFields.line2}
                        onChange={(e) => setAddressFields({...addressFields, line2: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="City"
                            value={addressFields.city}
                            onChange={(e) => setAddressFields({...addressFields, city: e.target.value})}
                        />
                        <input
                            type="text"
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="State"
                            value={addressFields.state}
                            onChange={(e) => setAddressFields({...addressFields, state: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Pincode"
                            value={addressFields.pincode}
                            onChange={(e) => setAddressFields({...addressFields, pincode: e.target.value})}
                        />
                        <input
                            type="text"
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Country"
                            value={addressFields.country}
                            onChange={(e) => setAddressFields({...addressFields, country: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                            onClick={handleSave}
                        >
                            Save Address
                        </button>
                        {onCancel && <button onClick={onCancel}>Cancel</button>}
                    </div>
                </div>
            ) : (
                <div className="text-gray-700 dark:text-gray-300">
                    <p>{currentAddress || "No address provided"}</p>
                    <button
                        className="mt-4 text-orange-500 hover:text-orange-600 underline"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Address
                    </button>
                </div>
            )}
        </div>
    );
};

export default Address;