import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axiosInstance";

// PasswordUpdate Component
const PasswordUpdate = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token not found. Please log in again.");

      const response = await axiosInstance.put(
        "/api/users/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully. Redirecting to sign-in...");
        setTimeout(() => {
          localStorage.removeItem('authToken');
          navigate("/auth/signin");
        }, 3000);
      } else {
        throw new Error("Failed to update password.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <>
      <form onSubmit={handlePasswordUpdate}>
        {/* Current Password */}
        <div className="mb-5.5 relative">
          <label className="block text-sm font-medium" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded border py-3 px-4 pr-12 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y text-gray-500"
            onClick={() => setShowCurrentPassword((prev) => !prev)}
          >
            {showCurrentPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

      {/* New Password */}
      <div className="mb-5.5 relative">
        <label className="block text-sm font-medium" htmlFor="newPassword">
          New Password
        </label>
        <input
          type={showNewConfirmPassword ? "text" : "password"}
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded border py-3 px-4 pr-12 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y text-gray-500"
          onClick={() => setShowNewConfirmPassword((prev) => !prev)}
        >
          {showNewConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="mb-5.5 relative">
        <label className="block text-sm font-medium" htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <input
          type={showNewConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded border py-3 px-4 pr-12 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
          required
        />
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-700"
        >
          Update Password
        </button>
      </form>
      <ToastContainer />
    </>
  );
};


// PersonalSettings Component
const PersonalSettings = () => {
  const { userInfo, loading, error, updatePersonalInfo } = useUserInfo();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.personalDetails.fullName || "",
        email: userInfo.personalDetails.email || "",
        phoneNumber: userInfo.personalDetails.phoneNumber || "",
        address: userInfo.personalDetails.address || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
      }

      const response = await axiosInstance.put(
        "/api/users/update-personal-info",
        { personalDetails: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data;
      updatePersonalInfo(updatedUser);
      toast.success("Changes saved successfully!");
    } catch (err) {
      console.error("Error updating personal info:", err);
      toast.error("Failed to update personal information.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-4xl">
      <ToastContainer />
      {submitError && <p className="text-red-500">Error: {submitError}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        {/* Personal Information */}
        <div className="flex-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSaveChanges}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded border py-3 px-4 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded border py-3 px-4 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
                  />
                </div>
              </div>
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded border py-3 px-4 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
                  disabled
                  title="Email address cannot be changed"
                />
                <p className="text-sm text-gray-500">Email address cannot be changed.</p>
              </div>
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded border py-3 px-4 focus:border-orange-500 focus-visible:outline-none dark:bg-meta-4"
                />
              </div>
              <div className="flex justify-between gap-5">
                <button
                  type="submit"
                  className="w-full rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Update */}
        <div className="flex-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Update Password</h3>
          </div>
          <div className="p-7">
            <PasswordUpdate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSettings;
