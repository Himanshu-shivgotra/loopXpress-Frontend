import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import axiosInstance from '../../common/axiosInstance';
import loopLogo from "../../assets/logo/looplogo.png"
import useUserInfo from '../../hooks/useUserInfo';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [user, setUser] = useState<any>(null); // State to hold the user data
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get('/api/users/user-info', { // Use axiosInstance
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) { // Check for successful response
            setUser(response.data); // Set user data
          } else if (response.status === 401) {
            console.error('Unauthorized, redirecting to login');
            localStorage.removeItem('authToken');
            navigate('/auth/signin');
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
    } else {
      console.error('No token found');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    navigate("/auth/signin");
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-stroke dark:bg-boxdark lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link className="block flex-shrink-0 lg:hidden " to="/">
            <img className='h-12' src={loopLogo} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          {/* Search bar */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggler */}
            <DarkModeSwitcher />
            {/* Notification Menu */}
            <DropdownNotification />
            {/* Message Notification */}
            {/* <DropdownMessage /> */}
          </ul>

          {/* User Dropdown */}

          <DropdownUser user={user} onLogout={handleLogout} />

        </div>
      </div>
    </header>
  );
};

export default Header;
