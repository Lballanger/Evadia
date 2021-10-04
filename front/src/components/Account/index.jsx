import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import './styles.scss';
import userStore from '../../store/user';

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
      <div className="account__container">
        <div className="account__avatar__display">
          <img
            className="account__avatar__img"
            src="https://www.impressions-languedoc.eu/1967-large_default/dark-vador-casque.jpg"
            alt="dark vador"
          />
        </div>
        <div className="account__infos">
          <ul className="account__infos__ul">
            <li className="account__infos__li">{user.lastname}</li>
            <li className="account__infos__li">{user.firstname}</li>
            <li className="account__infos__li">{user.email}</li>
            <li className="account__infos__li">{user?.city.city_name}</li>
          </ul>
          <button className="account__infos__edit" type="button">
            Modifier
          </button>
        </div>
      </div>

      <Accordion title="Favoris" data={favorites} />
      <Accordion title="Blacklisté" data={blacklist} />

      <div className="account__delete">
        <button className="account__delete__btn" type="button">
          Supprimer mon compte
        </button>
      </div>
    </>
  );
};

export default Account;
