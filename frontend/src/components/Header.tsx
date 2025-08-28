'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Importing icons from lucide-react

const Header: React.FC = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ProductHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
              Home
            </Link>
            <Link href="/products-public" className="text-gray-700 hover:text-blue-600 px-3 py-2">
              Products
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Add Product
                </Link>
                <Link href="/profile" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Profile
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Welcome! {user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-3 text-2xl hover:bg-gray-100 rounded-md transition-colors" aria-label="Toggle menu">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/products-public" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                    Add Product
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                    Profile
                  </Link>
                  <span className="block px-3 py-2 text-gray-700">Welcome!</span>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                    Login
                  </Link>
                  <Link href="/register" className="block px-3 py-2 text-blue-600 hover:text-blue-700">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
