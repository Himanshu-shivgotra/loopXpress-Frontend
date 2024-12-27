import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthHeader } from './AuthHeader';
import axiosInstance from '../../common/axiosInstance';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await axiosInstance.post('/api/users/forgot-password', {
        email,
      });

      setIsSuccess(true);
      setMessage('Password reset instructions have been sent to your email.');
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

  return (
    <>
      <AuthHeader />
      <div className="rounded-sm border flex items-center justify-center w-full py-4">
        <div className="w-full mx-auto max-w-[500px] shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
          <div className="w-full sm:p-8 xl:p-10">
            <h2 className="mb-4 text-2xl font-bold text-orange-500 dark:text-white sm:text-title-xl2">
              Forgot Password
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

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
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage('');
                  }}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
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

export default ForgotPassword;