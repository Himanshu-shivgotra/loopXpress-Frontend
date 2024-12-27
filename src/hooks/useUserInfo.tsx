import { useState, useEffect } from 'react';

interface PersonalDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  profilePic:string;
}
interface BusinessDetails {
  businessName: string;
  businessType: string;
  businessPhone: string;
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
        if (!token) {
          throw new Error('User not authenticated. Please log in.');
        }

        const response = await fetch('https://loop-xpress-backend.vercel.app/api/users/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
        setError(null); // Clear errors if successful
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

      const response = await fetch('https://loop-xpress-backend.vercel.app/api/users/update-personal-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update personal info');
      }

      const updatedUser = await response.json();
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

      const response = await fetch('https://loop-xpress-backend.vercel.app/api/users/update-business-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update business info');
      }

      const updatedUser = await response.json();
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

        const response = await fetch('https://loop-xpress-backend.vercel.app/api/users/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user info');
        }

        const data = await response.json();
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
