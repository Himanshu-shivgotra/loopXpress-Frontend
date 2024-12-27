import React from 'react';
import { Link } from "react-router-dom";
import loopLogo from "../../../dist/assets/looplogo.png"
import { FaHome } from "react-icons/fa"; // Importing an icon from react-icons

export const AuthHeader = () => {
    return (
        <>
            <div
                className={`w-full z-50 text-white transition-all duration-500 ease-in-out bg-transparent mb-2`}
            >
                <div className="container mx-auto px-10">
                    <nav className="flex justify-between items-center">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-2">
                            <Link to="/">
                                <img
                                    src={loopLogo}
                                    alt="Logo"
                                    className="h-20"
                                />
                            </Link>
                        </div>

                        {/* Home Link Section */}
                        <div>
                            <Link
                                to="/"
                                className="flex items-center text-[#f9802c] space-x-2 text-lg font-medium hover:text-[#f97316]"
                            >
                                <FaHome className="mr-2 hover:ml-1" /> {/* Backward arrow icon */}
                                <span>Home</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};
