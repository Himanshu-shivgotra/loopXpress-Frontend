import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PersonalDetails: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });

    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let formErrors: any = {};

    // Full Name
    if (!data.fullName) formErrors.fullName = "Full Name is required.";

    // Email
    if (!data.email) {
      formErrors.email = "Email is required.";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.email)) {
      formErrors.email = "Invalid email format.";
    }

    // Password
    if (!data.password) {
      formErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(data.password)) {
      formErrors.password = "Password must contain at least one uppercase letter, one number, and one special character.";
    }

    // Phone Number
    if (!data.phoneNumber) {
      formErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      formErrors.phoneNumber = "Phone Number must be 10 digits.";
    }

    // Address
    if (!data.address) formErrors.address = "Address is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-lg shadow-md bg-white dark:bg-boxdark dark:border-strokedark">
        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="mb-6 text-2xl font-bold text-orange-500 dark:text-white">
            Sign Up to Loop
          </h2>
          <form>
            <span className="mb-1.5 block font-medium text-black dark:text-white">
              Seller Personal Details
            </span>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="mb-2.5 font-medium text-black dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border py-2 px-4 dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                    errors.fullName ? "border-red-500" : "focus:border-orange-500"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2.5 font-medium text-black dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border py-2 px-4 dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                    errors.email ? "border-red-500" : "focus:border-orange-500"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              {/* Password */}
              <div className="flex flex-col">
                <label className="mb-2.5 font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border py-2 px-4 dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                      errors.password ? "border-red-500" : "focus:border-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="mb-2.5 font-medium text-black dark:text-white">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={`w-full rounded-lg border py-2 px-4 dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "focus:border-orange-500"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col mt-6">
              <label className="mb-2.5 font-medium text-black dark:text-white">
                Address
              </label>
              <textarea
                name="address"
                value={data.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`w-full rounded-lg border py-2 px-4 dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                  errors.address ? "border-red-500" : "focus:border-orange-500"
                }`}
                rows={3}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleNext}
                className="w-full rounded-lg bg-primary p-4 text-white hover:bg-opacity-90"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
