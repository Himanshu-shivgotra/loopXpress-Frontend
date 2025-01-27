import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useUserInfo from '../hooks/useUserInfo';

const Profile = () => {
  const { userInfo, loading, error } = useUserInfo();

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('sellerName', userInfo.personalDetails.fullName);
      localStorage.setItem('sellerEmail', userInfo.personalDetails.email);
      localStorage.setItem('userId', userInfo._id);
    }
  }, [userInfo]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10 text-lg">{error.message}</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-lg border border-stroke bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-700">
        <div className="px-6 py-10 text-center">
          {/* Profile Image */}
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-orange-400 shadow-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${userInfo?.personalDetails?.fullName?.charAt(0) || 'U'}`}
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>

          {/* User Information */}
          <div className="mt-6">
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {userInfo?.personalDetails?.fullName ? userInfo?.personalDetails?.fullName.charAt(0).toUpperCase() + userInfo?.personalDetails?.fullName.slice(1) : 'Name not available'}
            </h3>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-300">
              {userInfo?.personalDetails?.email || 'Email not available'}
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-8 space-y-6 text-left">
            <div className="mx-auto max-w-md px-6 py-4 rounded-lg bg-white shadow dark:bg-gray-800">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Phone:
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {userInfo?.personalDetails?.phoneNumber || 'Phone not available'}
              </p>
            </div>
            <div className="mx-auto max-w-md px-6 py-4 rounded-lg bg-white shadow dark:bg-gray-800">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Address:
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {userInfo?.personalDetails?.address || 'Address not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
