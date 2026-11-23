
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check whether an active session exists
  const isAuthenticated = Boolean(
    localStorage.getItem("authToken") ||
    localStorage.getItem("isAuthenticated")
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#F5F7F4] py-5 px-6 relative">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2 sm:px-8 lg:px-12">

        {/* EducateU Branding */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/educateu-logo.png"
              alt="EducateU Logo"
              className="w-25 h-25 object-contain"
            />

            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
              <span className="text-[#123D35]">Educate</span>
              <span className="text-[#347A65]">U</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#123D35] rounded-xl shadow-sm hover:bg-[#347A65] transition-all cursor-pointer"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-[#123D35] font-semibold text-lg hover:text-[#347A65] transition-colors"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-[#123D35] focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-[#F5F7F4] border-b border-slate-200 py-4 px-6 flex flex-col gap-4 shadow-md z-50">
          {isAuthenticated ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="text-white font-semibold text-base py-2 text-center bg-[#123D35] rounded-xl shadow-sm"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-[#123D35] font-semibold text-base py-2 text-center"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
