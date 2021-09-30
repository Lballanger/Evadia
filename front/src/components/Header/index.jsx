import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';
import useWindowSize from '../../hooks/useWindowSize';
import userStore from '../../store/user';
import './styles.scss';
import API from '../../api';

const Header = ({ location: { pathname } }) => {
  const history = useHistory();
  const { isMobile, isTablet } = useWindowSize();
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const [showLinks, setShowLinks] = useState(false);

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
      if (pathname === '/account') history.push('/');
      console.log('Reset user data');
      setUser(null);
    }
  };

  useEffect(() => {
    console.log(pathname);
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
          <strong>Evadia</strong>
        </h1>
      </NavLink>

      {!isMobile && !isTablet ? (
        <ul className="header__links">
          {user ? (
            <>
              <li className="header__item slideInDown-1">
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
                  Déco
                </button>
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
            style={{ zIndex: 99 }}
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
                  backgroundColor: 'rgba(0,0,0,.95)',
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
                        <NavLink
                          className="header__link"
                          type="button"
                          to="/account"
                        >
                          <div className="header__links__display">
                            <li className="header__item slideInDown-2">
                              Bonjour {user.firstname}
                            </li>
                          </div>
                        </NavLink>
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
