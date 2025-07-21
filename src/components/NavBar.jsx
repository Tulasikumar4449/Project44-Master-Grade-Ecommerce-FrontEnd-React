import { Badge } from '@mui/material';
import React, { useState } from 'react';
import { FaShoppingCart, FaSignInAlt, FaStore } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { IoIosMenu } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import BackDrop from './BackDrop';

function NavBar() {
  // Get the length of the cart
  const cart = useSelector((state) => state.carts.cart);

  // Get the user from the redux store
  const user = useSelector((state) => state.auth.user);

  const cartLength = cart.length;

  const { pathname } = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for UserMenu

  // Navigation items configuration
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Toggle mobile menu
  const toggleNavbar = () => setNavbarOpen((prev) => !prev);

  // Handle menu toggle for UserMenu
  const handleMenuToggle = (isOpen) => setMenuOpen(isOpen);

  // Determines if a navigation item is active
  const isActive = (path) => pathname === path;

  // Base styles with conditional mobile menu height/visibility
  const mobileMenuClasses = navbarOpen
    ? 'h-fit sm:pb-5'
    : 'h-0 overflow-hidden';

  return (
    <>
      <nav className="h-[70px] bg-gray-800 text-white z-50 flex items-center justify-center sticky top-0">
        <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold">
            <FaStore className="mr-2 text-3xl" />
            <span className="font-[Poppins]">E-Shop</span>
          </Link>

          {/* Navigation Links */}
          <ul
            className={`
              flex sm:gap-10 gap-4 sm:items-center text-slate-800 
              sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md 
              ${mobileMenuClasses} transition-all duration-100 
              sm:h-fit sm:bg-none bg-custom-gradient text-white 
              sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0
            `}
          >
            {/* Dynamic Navigation Items */}
            {navItems.map(({ path, label }) => (
              <li key={path} className="font-[500] transition-all duration-150">
                <Link
                  to={path}
                  className={isActive(path) ? 'text-white font-semibold' : 'text-gray-200'}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Cart Icon with Badge */}
            <li className="font-[500] transition-all duration-150 pt-1">
              <Link
                to="/cart"
                className={isActive('/cart') ? 'text-white font-semibold' : 'text-gray-200'}
              >
                <Badge
                  showZero
                  badgeContent={cartLength}
                  color="primary"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <FaShoppingCart size={20} className="" />
                </Badge>
              </Link>
            </li>

            {/* Login Button or UserMenu */}
            {user && user.userName ? (
              <li className="font-[500] transition-all duration-150">
                <UserMenu onMenuToggle={handleMenuToggle} />
              </li>
            ) : (
              <li className="font-[500] transition-all duration-150">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-[6px]
                    bg-gradient-to-r from-purple-600 to-red-500
                    text-white font-semibold rounded-md shadow-lg
                    hover:from-purple-500 hover:to-red-400 transition
                    ease-in-out duration-300 transform"
                >
                  <FaSignInAlt size={25} />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleNavbar}
            className="sm:hidden flex items-center sm:mt-0 mt-2"
            aria-label={navbarOpen ? 'Close menu' : 'Open menu'}
          >
            {navbarOpen ? (
              <RxCross2 size={25} className="text-white text-3xl" />
            ) : (
              <IoIosMenu size={25} className="text-white text-3xl" />
            )}
          </button>
        </div>
      </nav>
      <BackDrop open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default NavBar;