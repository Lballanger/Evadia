import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Accordion from './Accordion';

import './styles.scss';
import userStore from '../../store/user';

const styles = {
  image: {
    height: '6rem',
    borderRadius: '50%',
    outline: '5px solid rgb(79 146 186)',
    boxShadow: '0px 0 15px',
    zIndex: 2,
    background: 'darkcyan',
    padding: '0.1rem',
  },
};

const Account = () => {
  const user = userStore((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [blacklist, setBlacklist] = useState([]);

  useEffect(() => {
    if (user) {
      const userFavorites = user.favorites.filter((city) => city.is_favorite);
      const userBlacklist = user.favorites.filter((city) => !city.is_favorite);
      setFavorites(userFavorites);
      setBlacklist(userBlacklist);
    }
  }, [user]);

  return (
    <>
      <div className="account__main">
        <div className="account__container">
          <div className="account__avatar__display">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="account__avatar__img"
              style={styles.image}
              src={`https://eu.ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&rounded=true&background=0dbca4&color=efefef&font-size=0.75`}
              alt={`Profile of ${user.firstname} ${user.lastname}`}
            />
          </div>
          <div className="account__infos">
            <ul className="account__infos__ul">
              <li className="account__infos__li">
                {user.lastname} {user.firstname}
              </li>
              <li className="account__infos__li">{user.email}</li>
              <li className="account__infos__li">
                {user.city.code_postal[0]} {user?.city.city_name}
              </li>
            </ul>
            <button className="account__infos__edit" type="button">
              Modifier
            </button>
          </div>
        </div>

        <Accordion title="Favoris" data={favorites} className="favoris" />
        <Accordion title="Blacklistés" data={blacklist} className="blackList" />

        <div className="account__delete">
          <button className="account__delete__btn" type="button">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
