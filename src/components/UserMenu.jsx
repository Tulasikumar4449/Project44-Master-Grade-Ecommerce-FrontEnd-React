import { Avatar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { pink } from '@mui/material/colors';

export default function UserMenu({ onMenuToggle }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Get the user from the redux store
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onMenuToggle) onMenuToggle(true); // Notify parent that menu is open
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onMenuToggle) onMenuToggle(false); // Notify parent that menu is closed
  };

  const logOutHandler = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("cartItems");
    
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: pink[500] }}>
          {user.userName
            .split(' ')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')}
        </Avatar>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
            sx: {
              width: 160,
            },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex items-center gap-2">
            <BiUser className="text-xl" />
            <span className="font-semibold mt-1">
              {user && user.userName.split(' ')[0]}
            </span>
          </MenuItem>
        </Link>

        <Link to="/profile/order">
          <MenuItem onClick={handleClose} className="flex items-center gap-2">
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link>

        <MenuItem onClick={logOutHandler} className="flex items-center gap-2">
          <div
            className="flex items-center space-x-2 px-4 py-[6px]
                    bg-gradient-to-r from-purple-600 to-red-500
                    text-white font-semibold rounded-md shadow-lg
                    hover:from-purple-500 hover:to-red-400 transition
                    ease-in-out duration-300 transform"
          >
            <IoExitOutline className="text-xl" />
            <span className="font-semibold">LogOut</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}