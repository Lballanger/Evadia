import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo.png';
import useWindowSize from '../../hooks/useWindowSize';
import userStore from '../../store/user';
import './styles.scss';
import API from '../../api';
import UserMenu from './UserMenu';

const styles = {
  btnNav: {
    padding: '.3rem .6rem',
    background: '#fff',
    color: '#333',
    lineHeight: 1,
    borderRadius: '.4rem',
    boxShadow: '0 0 10px -2px rgb(0 0 0 / 60%)',
    fontWeight: 500,
  },
  btn: {
    position: 'relative',
    cursor: 'pointer',
    color: 'rgb(34, 34, 34)',
    paddingRight: '.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '.7rem',
    borderRadius: '.4rem',
    border: 'none',
    background: 'rgb(79 146 186)',
    boxShadow: '0 0 10px -4px rgba(22, 22, 22, .7)',
    zIndex: 3,
  },
  image: {
    height: '30px',
    borderRadius: '50%',
    border: '1px solid rgb(79 146 186)',
    boxShadow: '4px 0 10px',
    zIndex: 2,
  },
};

const Header = ({ location: { pathname } }) => {
  const history = useHistory();
  const { isMobile, isTablet } = useWindowSize();
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const [showLinks, setShowLinks] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const closeMenu = () => {
    if ((isMobile || isTablet) && showLinks) {
      setShowLinks(false);
    }
  };

  const handleLogout = async () => {
    const data = await API.doLogout();
    if (data.success) {
      toast.success('Vous vous êtes déconnecté');
      if (pathname === '/account') history.push('/');
      setUser(null);
    }
  };

  const handleUserMenu = (event) => {
    event.stopPropagation();
    setProfileMenu((state) => !state);
  };

  useEffect(() => {
    closeMenu();
  }, [isMobile, pathname]);

  return (
    <header className={`header ${showLinks ? 'show-nav' : 'hide-nav'} `}>
      <NavLink
        onClick={closeMenu}
        className="header__logo__button"
        type="button"
        to="/"
      >
        <img src={logo} className="header__logo" alt="Logo Evadia" />
        <h1 className="header__h1">
          <strong className="font-link">Evadia</strong>
        </h1>
      </NavLink>

      {!isMobile && !isTablet ? (
        <ul className="header__links">
          {user ? (
            <>
              {/* <li className="header__item slideInDown-1">
                <NavLink className="header__link" type="button" to="/account">
                  Bonjour {user.firstname}
                </NavLink>
              </li>
              <li className="header__item slideInDown-2">
                <button
                  className="header__link"
                  type="button"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline />
                </button>
              </li> */}
              <li className="header__item">
                <button
                  className="header__link"
                  type="button"
                  style={styles.btn}
                  onClick={handleUserMenu}
                >
                  <img
                    style={styles.image}
                    src={`https://eu.ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&rounded=true&background=0dbca4&color=efefef&font-size=0.6`}
                    alt={`Profile of ${user.firstname} ${user.lastname}`}
                  />
                  {profileMenu ? (
                    <IoCaretUpOutline color="#efefef" />
                  ) : (
                    <IoCaretDownOutline color="#efefef" />
                  )}
                </button>

                <AnimatePresence exitBeforeEnter initial={false}>
                  {profileMenu && (
                    <UserMenu
                      user={user}
                      handleLogout={handleLogout}
                      onDismiss={() => setProfileMenu(false)}
                    />
                  )}
                </AnimatePresence>
              </li>
            </>
          ) : (
            <>
              <li className="header__item">
                <NavLink className="header__link" type="button" to="/connexion">
                  Connexion
                </NavLink>
              </li>

              <li className="header__item">
                <NavLink
                  className="header__link"
                  type="button"
                  to="/inscription"
                >
                  Inscription
                </NavLink>
              </li>
            </>
          )}
        </ul>
      ) : (
        <>
          <button
            className="header__burger"
            type="button"
            onClick={handleShowLinks}
            style={{ zIndex: 99, backgroundColor: 'transparent' }}
          >
            <span className="burger-bar" />
          </button>
          <AnimatePresence exitBeforeEnter initial="initial">
            {showLinks && (
              <motion.div
                initial={{ clipPath: 'circle(0% at 100% 0%)' }}
                animate={{
                  clipPath: 'circle(150% at 100% 0%)',
                  transition: { duration: 0.5 },
                }}
                exit={{
                  clipPath: 'circle(0% at 100% 0%)',
                  transition: { duration: 0.3 },
                }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(220, 220, 220, 0.71)',
                }}
              >
                <ul
                  className="header__links"
                  style={{
                    visibility: 'visible',
                    opacity: 1,
                  }}
                >
                  <AnimatePresence initial="initial">
                    {user ? (
                      <>
                        <motion.li
                          initial={{ opacity: 0, x: 100, y: -100 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: { delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            x: 100,
                            y: -100,
                            transition: { delay: 0 },
                          }}
                        >
                          <NavLink
                            className="header__link"
                            type="button"
                            to="/account"
                          >
                            <div className="header__links__display">
                              <li className="header__item slideInDown-2">
                                Mon profil
                              </li>
                            </div>
                          </NavLink>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: 100, y: -100 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: { delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            x: 100,
                            y: -100,
                            transition: { delay: 0 },
                          }}
                        >
                          <button
                            className="header__link"
                            type="button"
                            onClick={handleLogout}
                          >
                            <div className="header__links__display">
                              <span className="header__item slideInDown-2">
                                Déconnexion
                              </span>
                            </div>
                          </button>
                        </motion.li>
                      </>
                    ) : (
                      <>
                        <motion.li
                          initial={{ opacity: 0, x: 100, y: -100 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: { delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            x: 100,
                            y: -100,
                            transition: { delay: 0 },
                          }}
                        >
                          <NavLink
                            className="header__link"
                            type="button"
                            to="/connexion"
                          >
                            <div className="header__links__display">
                              <span className="header__item slideInDown-1">
                                Connexion
                              </span>
                            </div>
                          </NavLink>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: 100, y: -100 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: { delay: 0.3 },
                          }}
                          exit={{
                            opacity: 0,
                            x: 100,
                            y: -100,
                            transition: { delay: 0 },
                          }}
                        >
                          <NavLink
                            className="header__link"
                            type="button"
                            to="/inscription"
                          >
                            <div className="header__links__display">
                              <span className="header__item slideInDown-2">
                                Inscription
                              </span>
                            </div>
                          </NavLink>
                        </motion.li>
                      </>
                    )}
                  </AnimatePresence>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);
