import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';
import './styles.scss';

const transition = { duration: 0.4, ease: [0.6, 0.01, -0.05, 0.9] };

const menuVariants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition,
  },
  exit: {
    y: -20,
    opacity: 0,
    transition,
  },
};

const UserMenu = ({ user, handleLogout, onDismiss }) => {
  const menuRef = useRef();

  useClickOutside(menuRef, onDismiss);

  return (
    <motion.div
      className="user-menu"
      ref={menuRef}
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ul className="user-menu__list">
        <li>
          <NavLink
            to="/account"
            className="user-menu__list__link"
            onClick={onDismiss}
          >
            <IoPersonCircleOutline width={24} height={24} /> {user.firstname}
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => {
              handleLogout();
              onDismiss();
            }}
            className="user-menu__list__link"
            type="button"
          >
            <IoLogOutOutline width={24} height={24} /> Se déconnecter
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

UserMenu.defaultProps = {
  onDismiss: () => {},
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  onDismiss: PropTypes.func,
};

export default UserMenu;
