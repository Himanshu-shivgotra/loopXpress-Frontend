import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthHeader } from "./AuthHeader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../common/axiosInstance";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            const response = await axiosInstance.post("/api/users/signin", {
                email,
                password,
            });

            const { token } = response.data;
            if (!token) {
                throw new Error("No token received from the server.");
            }

            localStorage.setItem("authToken", token);

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    console.log(`${key}:`, localStorage.getItem(key));
                }
            }

            navigate("/dashboard");
        } catch (error: any) {
            console.error("Error logging in:", error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <AuthHeader />
            <div className="px-4 rounded-sm border flex items-center justify-center w-full py-4">
                <div className="w-full mx-auto max-w-[500px] shadow-default bg-white dark:border-strokedark h-full dark:bg-boxdark">
                    <div className="w-full p-4 sm:p-8 xl:p-10">
                        <span className="mb-1.5 block font-medium text-sm sm:text-base">Start for free</span>
                        <h2 className="mb-4 text-xl font-bold text-orange-500 dark:text-white sm:text-title-xl2">
                            Sign In to Loop
                        </h2>

                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white text-sm sm:text-base">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMessage(""); // Clear error when typing
                                    }}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                                    disabled={isSubmitting} // Disable while submitting
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block font-medium text-black dark:text-white text-sm sm:text-base">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrorMessage(""); // Clear error when typing
                                        }}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-black outline-none focus:border-orange-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-orange-500"
                                        disabled={isSubmitting} // Disable while submitting
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="mt-2 text-right">
                                    <Link to="/auth/forgot-password" className="text-primary text-sm sm:text-base">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <div className="mb-5">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 sm:p-4 text-white transition hover:bg-opacity-90"
                                    disabled={isSubmitting} // Disable while submitting
                                >
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm sm:text-base">
                                    Don’t have an account?{" "}
                                    <Link to="/auth/signup" className="text-primary">
                                        Sign Up
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

export default SignIn;
