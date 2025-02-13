import { useState, useEffect } from 'react';
import axiosInstance from '../common/axiosInstance';

interface AdminInfo {
    _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}


interface AdminInfoError {
  message: string;
}

const useAdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AdminInfoError | null>(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('role');
        
        if (!token) {
          throw new Error('Admin not authenticated.');
        }

        if (role !== 'admin') {
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get('/api/admin/admin-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.data;
        setAdminInfo(data);
        setError(null);
      } catch (err: any) {
        const message = err.message || 'Failed to fetch admin info';
        setError({ message });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, []);


//   const refetch = () => {
//     setLoading(true);
//     setError(null);
//     const fetchAdminInfo = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           throw new Error('Admin not authenticated. Please log in.');
//         }

//         const response = await axiosInstance.get('/api/admin/admin-info', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.data;
//         setAdminInfo(data);
//         setError(null);
//       } catch (err: any) {
//         const message = err.message || 'Failed to fetch admin info';
//         setError({ message });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminInfo();
//   };

  return { adminInfo, loading, error,  };
};

export default useAdminInfo;
