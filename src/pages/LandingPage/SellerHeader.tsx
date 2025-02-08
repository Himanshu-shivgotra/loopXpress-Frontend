import React from 'react';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import adrenalLogo from "../../assets/logo/Adrenal_Go_logo.png"

const SellerNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const handleScroll = () => {
        if (window.scrollY > 40) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-400 ease-in-out ${
                isScrolled || (menuOpen && window.innerWidth < 768) 
                    ? "bg-[#141414] shadow-md" 
                    : "bg-transparent"
            }`}
        >
            <div className="container lg:px-20 md:px-8 sm:px-4">
                <nav className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src={adrenalLogo} alt="Logo"
                                className="h-12 sm:h-18 m-4"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={handleMenuToggle}
                            className="text-white focus:outline-none"
                        >
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                                    }`}
                            ></span>
                        </button>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/auth/signin">
                            <button
                                className="bg-[#ff7722] text-white border-2 border-white  font-bold py-2 px-4 hover:text-black hover:bg-white"
                            >
                                Login
                            </button>
                        </Link>
                        <Link to="/auth/signup">
                            <button
                                className="bg-transparent text-white border-2-white font-bold py-2 px-4 hover:text-black hover:bg-white"
                            >
                                Start Selling
                            </button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-[#141414] transition-all duration-500 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                        }`}
                    style={{
                        overflow: "hidden"
                    }}
                >
                    <div className="text-white pb-4 text-center">

                        <div className="flex items-center justify-around mt-4">
                            <Link to="/auth/signin">
                                <button
                                    className="bg-[#ff7722] w-[8rem] text-white border-2-white font-bold py-2 px-4 hover:text-black hover:bg-white"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="/auth/signup">
                                <button
                                    className="bg-transparent text-white border-2 border-white font-bold py-2 px-4 hover:text-black hover:bg-white"
                                >
                                    Start Selling
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerNavbar
