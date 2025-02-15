import React, { useEffect, useState } from "react";
import axiosInstance from "../../common/axiosInstance";
import { FaPhoneAlt } from "react-icons/fa";
import Loader from "../../common/Loader";

interface Seller {
  _id: string;
  personalDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  businessDetails: {
    businessName: string;
    brandName: string;
    businessType: string;
    businessEmail: string;
    gstNumber: string;
  };
}

export default function SellerList() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSellers = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/sellers");
      setSellers(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error fetching sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (loading)
    return (<Loader/>);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-orange-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#24303f] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500 dark:text-white">
        Seller List
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#24303f] dark:to-[#24303f] p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Total Sellers:{" "}
          <span className="text-orange-500">{sellers.length}</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div
            key={seller._id}
            className="bg-white dark:bg-[#24303f] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-[#dc651d] hover:border-blue-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-[#dc651d] rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-white font-bold text-xl">
                  {seller.personalDetails.fullName[0]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-500 dark:text-white">
                  {seller.personalDetails.fullName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {seller.personalDetails.email}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                <p className="text-gray-700 dark:text-gray-300">
                  {seller.personalDetails.phoneNumber}
                </p>
              </div>
              <hr className="my-2 border-gray-100 dark:border-[#dc651d]" />
              <div className="bg-gray-50 dark:bg-[#1e293b] p-3 rounded-lg">
                <p className="font-medium text-gray-800 dark:text-white">
                  {seller.businessDetails.businessName}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Brand</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {seller.businessDetails.brandName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Type</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {seller.businessDetails.businessType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Email</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {seller.businessDetails.businessEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">GST</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {seller.businessDetails.gstNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   );
// }