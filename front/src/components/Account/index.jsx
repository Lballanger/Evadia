import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Accordion from './Accordion';

import './styles.scss';
import userStore from '../../store/user';
import cityStore from '../../store/city';
import AutoSuggest from '../AutoSuggest';
import DeleteAccount from './DeleteAccount';
import API from '../../api';

const styles = {
  image: {
    height: '6rem',
    borderRadius: '50%',
    border: '1px solid rgb(79 146 186)',
    boxShadow: '0px 0 15px',
    zIndex: 2,
    background: 'darkcyan',
    padding: '0.1rem',
  },
};

const Account = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const [inputs, setInputs] = useState({ ...user, city: user.city.code_insee });
  const favoritesStore = cityStore((state) => state.favorites);
  const [favorites, setFavorites] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userFavorites = favoritesStore.filter((city) => city.is_favorite);
    const userBlacklist = favoritesStore.filter(
      (city) => !city.is_favorite && city.is_favorite !== null
    );
    setFavorites(userFavorites);
    setBlacklist(userBlacklist);
  }, [favoritesStore]);

  const cancelEdit = (data = null) => {
    setIsEditing(false);
    setInputs(
      data
        ? { ...data, city: data.city.code_insee }
        : { ...user, city: user.city.code_insee }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await API.updateUser(inputs);
      const { data: userData } = await API.getUser();
      setUser(userData);
      toast.success('Votre profil a bien été mis à jour');
      cancelEdit(userData);
    } catch (error) {
      console.log(error);
      toast.error('Une erreur est survenue');
    }
  };

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
              src={`https://eu.ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&rounded=true&background=0dbca4&color=efefef&font-size=0.6`}
              alt={`Profile of ${user.firstname} ${user.lastname}`}
            />
          </div>
          <div className="account__infos">
            {!isEditing ? (
              <>
                <ul className="account__infos__ul">
                  <li className="account__infos__li">
                    {user.lastname} {user.firstname}
                  </li>
                  <li className="account__infos__li">{user.email}</li>
                  <li className="account__infos__li">
                    {user.city.code_postal[0]} {user?.city.city_name}
                  </li>
                </ul>
                <button
                  className="account__infos__edit"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </button>
              </>
            ) : (
              <>
                <form className="account__infos__form" onSubmit={handleSubmit}>
                  <div className="account__infos__form__container">
                    <input
                      className="account__infos__input"
                      type="text"
                      name="firstname"
                      placeholder="Prénom"
                      value={inputs.firstname}
                      onChange={(e) => {
                        setInputs({ ...inputs, firstname: e.target.value });
                      }}
                    />
                    <input
                      className="account__infos__input"
                      type="text"
                      name="lastname"
                      placeholder="Nom"
                      value={inputs.lastname}
                      onChange={(e) => {
                        setInputs({ ...inputs, lastname: e.target.value });
                      }}
                    />
                    <input
                      className="account__infos__input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={inputs.email}
                      onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value });
                      }}
                    />
                    <AutoSuggest
                      limit={4}
                      onSelected={(selected) => {
                        console.log(selected);
                        setInputs({ ...inputs, city: selected.code_insee });
                      }}
                    />
                    <button className="account__infos__submit" type="submit">
                      Enregistrer
                    </button>
                  </div>
                </form>
                <button
                  className="account__infos__edit cancel"
                  type="button"
                  onClick={cancelEdit}
                >
                  Annuler
                </button>
              </>
            )}
          </div>
        </div>

        <Accordion title="Favoris" data={favorites} className="favoris" />
        <Accordion title="Blacklistés" data={blacklist} className="blackList" />

        <div className="account__delete">
          <DeleteAccount />
        </div>
      </div>
    </>
  );
};

export default Account;
