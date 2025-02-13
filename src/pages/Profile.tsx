import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useUserInfo from '../hooks/useUserInfo';
import axiosInstance from '../common/axiosInstance';

const Profile = () => {
  const { userInfo, loading, error } = useUserInfo();
  const [adminInfo, setadminInfo] = useState<{ name: string; email: string } | null>(null);
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (role === 'admin') {
          const response = await axiosInstance.get('/api/admin/admin-info', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          setadminInfo(response.data)
          localStorage.setItem('sellerName', response.data?.name);
          localStorage.setItem('userId', response.data._id);
        } else if (userInfo) {
          localStorage.setItem('sellerName', userInfo.personalDetails.fullName);
          localStorage.setItem('userId', userInfo._id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    

    fetchUserData();
  }, [userInfo, role]);
  
  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10 text-lg">{error.message}</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden dark:from-gray-800 dark:to-gray-700">
          {/* Profile Header */}
          <div className="bg-[#24303F] p-6 text-center">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  role === 'admin' 
                    ? adminInfo?.name?.charAt(0) || 'A'
                    : userInfo?.personalDetails?.fullName?.charAt(0) || 'U'
                }&background=dc651d&color=ffffff`}
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-3xl font-bold text-white">
              {role === 'admin' ? adminInfo?.name : userInfo?.personalDetails?.fullName || ""}
            </h3>
            <p className="text-lg  text-orange-100">
              {role === 'admin' ? adminInfo?.email : userInfo?.personalDetails?.email || 'Email not available'}
            </p>
          </div>

          {/* Show profile details only if not admin */}
          {role !== 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50 dark:bg-gray-900">
              {/* Personal Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg dark:bg-gray-800 border-l-4 border-orange-500">
                <h4 className="text-xl font-semibold text-orange-500  mb-4 flex items-center">
                  <span className="mr-2">Personal Details</span>
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 dark:text-orange-400 text-[#24303F]">Phone:</span> {userInfo?.personalDetails?.phoneNumber || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Address:</span> {userInfo?.personalDetails?.address || 'Not available'}
                  </p>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg dark:bg-gray-800 border-l-4 border-orange-500">
                <h4 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
                  <span className="mr-2">Business Details</span>
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Business Name:</span> {userInfo?.businessDetails?.businessName || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Business Type:</span> {userInfo?.businessDetails?.businessType || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Brand Name:</span> {userInfo?.businessDetails?.brandName || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Business Phone:</span> {userInfo?.businessDetails?.businessPhone || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Business Email:</span> {userInfo?.businessDetails?.businessEmail || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">GST Number:</span> {userInfo?.businessDetails?.gstNumber || 'Not available'}
                  </p>
                </div>
              </div>

              {/* Bank Details */}
              <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-6 shadow-lg dark:bg-gray-800 border-l-4 border-orange-500">
                <h4 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
                  <span className="mr-2">Bank Details</span>
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Account Number:</span> {userInfo?.bankDetails?.accountNumber || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">Bank Name:</span> {userInfo?.bankDetails?.bankName || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium dark:text-orange-400 text-[#24303F]">IFSC Code:</span> {userInfo?.bankDetails?.ifscCode || 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;