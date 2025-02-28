import { useState, useEffect } from 'react';
import axiosInstance from '../common/axiosInstance';

interface PersonalDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  profilePic: string;
}
interface BusinessDetails {
  businessName: string;
  businessType: string;
  businessPhone: string;
  brandName: string;
  businessEmail: string;
  gstNumber: string;
}
interface BankDetails {
  accountNumber: string;
  bankName: string;
  ifscCode: string;
}

interface UserInfo {
  _id: string;
  personalDetails: PersonalDetails;
  businessDetails: BusinessDetails;
  bankDetails: BankDetails;
}

interface UserInfoError {
  message: string;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<UserInfoError | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('role');
        
        if (!token) {
          throw new Error('User not authenticated.');
        }

        if (role === 'admin') {
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get('/api/users/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.data;
        setUserInfo(data);
        setError(null); 
      } catch (err: any) {
        const message = err.message || 'Failed to fetch user info';
        setError({ message });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const updatePersonalInfo = async (updatedDetails: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User not authenticated. Please log in.');

      // Remove password from updatedDetails if not changed
      if (!updatedDetails.personalDetails.password) {
        delete updatedDetails.personalDetails.password;
      }

      const response = await axiosInstance.put('/api/users/update-personal-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      const updatedUser = await response.data;
      setUserInfo(updatedUser); // Update the state

      // Invalidate the old JWT token if the password was updated
      if (updatedDetails.personalDetails.password) {
        localStorage.removeItem('authToken'); // Remove the old token
      }

      return updatedUser; // Return the updated user object
    } catch (err) {
      console.error('Error in updatePersonalInfo:', err.message);
      throw err;
    }
  };

  const updateBusinessInfo = async (updatedDetails: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User not authenticated. Please log in.');

      const response = await axiosInstance.put('/api/users/update-business-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      const updatedUser = await response.data;
      setUserInfo(updatedUser); // Update the state

      return updatedUser; // Return the updated user object
    } catch (err) {
      console.error('Error in updateBusinessInfo:', err.message);
      throw err;
    }
  };

  const refetch = () => {
    setLoading(true);
    setError(null);
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('User not authenticated. Please log in.');
        }

        const response = await axiosInstance.get('/api/users/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.data;
        setUserInfo(data);
        setError(null);
      } catch (err: any) {
        const message = err.message || 'Failed to fetch user info';
        setError({ message });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  };

  return { userInfo, loading, error, updatePersonalInfo, updateBusinessInfo, refetch };
};

export default useUserInfo;
