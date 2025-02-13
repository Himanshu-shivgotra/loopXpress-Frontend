import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { IoIosArrowDown } from "react-icons/io";
import { MdAppSettingsAlt } from "react-icons/md";
import useUserInfo from '../../hooks/useUserInfo';
import useAdminInfo from '../../hooks/useAdminInfo';
import { FaRegUser } from 'react-icons/fa';

interface User {
  name?: string;
  role?: string;
  profilePic?: string;
}

interface DropdownUserProps {
  user: User;
  onLogout: () => void;
}

const DropdownUser: React.FC<DropdownUserProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { adminInfo } = useAdminInfo();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // Determine the name and role to display
  const displayName = adminInfo?.name
    ? adminInfo.name.charAt(0).toUpperCase() + adminInfo.name.slice(1)
    : userInfo?.personalDetails?.fullName
    ? userInfo.personalDetails.fullName.charAt(0).toUpperCase() + userInfo.personalDetails.fullName.slice(1)
    : 'Guest';

  const displayRole = adminInfo?.role
    ? adminInfo.role
    : userInfo?.businessDetails?.businessType
    ? userInfo.businessDetails.businessType
    : 'Role';

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {displayName}
          </span>
          <span className="block text-xs">{displayRole}</span>
        </span>

        <span className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-200 text-black">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="User" className="rounded-full" />
          ) : (
            <span className="text-lg font-bold">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </span>

        {<IoIosArrowDown/>}
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                {<FaRegUser/>}
               
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                {<MdAppSettingsAlt/>}
              
                Account Settings
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-3.5 py-3.5 px-6">
            <button
              onClick={onLogout}
              className="text-sm font-medium text-red-600 dark:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;