import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthHeader } from './AuthHeader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../common/axiosInstance';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  const { token } = useParams(); // Extract the token from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token validity
    const verifyToken = async () => {
      try {
        await axiosInstance.get(`/api/users/reset-password/${token}`);
      } catch (error) {
        setIsValidToken(false);
        setMessage('Invalid or expired reset token');
      }
    };
    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      await axiosInstance.post(`/api/users/reset-password/${token}`, {
        newPassword: password,
      });

      setIsSuccess(true);
      setMessage('Password has been reset successfully');
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    } catch (error: any) {
      setIsSuccess(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isValidToken) {
    return (
      <>
        <AuthHeader />
        <div className="rounded-sm border flex items-center justify-center w-full py-4">
          <div className="w-full mx-auto max-w-[500px] shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
            <div className="w-full sm:p-8 xl:p-10">
              <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold text-red-500">Invalid Reset Link</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  This password reset link is invalid or has expired.
                </p>
                <Link
                  to="/auth/forgot-password"
                  className="text-primary hover:underline"
                >
                  Request a new password reset
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthHeader />
      <div className="rounded-sm border flex items-center justify-center w-full py-4">
        <div className="w-full mx-auto max-w-[500px] shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
          <div className="w-full sm:p-8 xl:p-10">
            <h2 className="mb-4 text-2xl font-bold text-orange-500 dark:text-white sm:text-title-xl2">
              Reset Password
            </h2>

            {message && (
              <div
                className={`mb-4 p-4 rounded ${
                  isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Remember your password?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
