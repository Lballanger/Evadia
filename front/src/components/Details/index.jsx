/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IoStar, IoStarOutline, IoSchool, IoBanOutline } from 'react-icons/io5';
import { GiHealthNormal, GiHealing, GiShop } from 'react-icons/gi';
import toast from 'react-hot-toast';
import cityStore from '../../store/city';
import userStore from '../../store/user';
import API from '../../api';
import Dropdown from './MenuMobile/Dropdown';
import useWindowSize from '../../hooks/useWindowSize';

import './styles.scss';
import BtnDesktop from './BtnDesktop/BtnDesktop';
import mapStore from '../../store/map';
import DropdownEtablissement from './DropdownCriteria/etablissment';
import DropdownPersonnel from './DropdownCriteria/personnel';
import DropdownShop from './DropdownCriteria/commerces';
import DropdownSchool from './DropdownCriteria/school';

const initialCardsState = {
  schools: false,
  commerce: false,
  health_institution: false,
  personal_health: false,
};

const markers = [];

// eslint-disable-next-line react/prop-types
const Details = () => {
  const { codeInsee } = useParams();
  const history = useHistory();
  const city = cityStore((state) => state.city);
  const setCity = cityStore((state) => state.setCity);
  const addToFavorites = cityStore((state) => state.addToFavorites);
  const removeFromFavorites = cityStore((state) => state.removeFromFavorites);
  const updateFromFavorite = cityStore((state) => state.updateFromFavorite);
  const user = userStore((state) => state.user);
  const setMarkers = mapStore((state) => state.setMarkers);
  const markersStore = mapStore((state) => state.markers);
  const setMapCenter = mapStore((state) => state.setMapCenter);
  const setMapZoom = mapStore((state) => state.setMapZoom);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(initialCardsState);
  const { isMobile, isTablet } = useWindowSize();

  // const handleCards = (name) => {
  //   if (!city[name]) return;
  //   // setCards((state) => {
  //   //   const data = city[name];
  //   //   // eslint-disable-next-line no-restricted-syntax
  //   //   if (!markers.length) {
  //   //     markers = markersStore.map((marker) => ({
  //   //       ...marker,
  //   //       key: marker.name,
  //   //     }));
  //   //   }
  //   //   if (!state[name] === true) {
  //   //     const newData =
  //   //       data !== null
  //   //         ? [...data].map((marker) => {
  //   //             const coords = marker.coordinates
  //   //               .slice(1, -1)
  //   //               .split(',')
  //   //               .map((val) => +val);
  //   //             return {
  //   //               type: marker.type || marker.categorie || marker.profession,
  //   //               name: marker.name,
  //   //               coords,
  //   //               key: name,
  //   //             };
  //   //           })
  //   //         : [];
  //   //     markers = [...markers, ...newData];
  //   //   } else {
  //   //     markers = markers.filter((marker) => marker.key !== name);
  //   //   }
  //   //   setMarkers(markers);
  //   //   // if (markers.length)
  //   //   //   setMapCenter(markers[0].coords[0], markers[0].coords[1]);
  //   //   return {
  //   //     ...state,
  //   //     [name]: !state[name],
  //   //   };
  //   // });
  //   setCards((state) => {
  //     const data = city[name];
  //     const hiddenLength = markers.filter((marker) => marker.hidden).length;
  //     if (!hiddenLength) {
  //       //
  //     }
  //     if (!state[name] === true) {
  //       const newData =
  //         data !== null
  //           ? [...data].map((marker) => {
  //               const coords = marker.coordinates
  //                 .slice(1, -1)
  //                 .split(',')
  //                 .map((val) => +val);
  //               return {
  //                 type: marker.type || marker.categorie || marker.profession,
  //                 name: marker.name,
  //                 coords,
  //                 key: name,
  //                 hidden: true,
  //               };
  //             })
  //           : [];
  //       markers = [...markers, ...newData];
  //     } else {
  //       markers = markers.map((marker) => {
  //         if (marker.key === name) {
  //           marker.hidden = false;
  //         }
  //         return marker;
  //       });
  //     }

  //     return {
  //       ...state,
  //       [name]: !state[name],
  //     };
  //   });
  //   setMarkers(markers);
  // };

  const showBan = () => {
    if (city.is_favorite === false) {
      return <IoBanOutline className="ban" color="#F56262" size="1.5em" />;
    }
    return <IoBanOutline className="ban" color="#628AF5" size="1.5em" />;
  };

  const showFavorite = () => {
    if (city.is_favorite && city.is_favorite === true) {
      return <IoStar className="favorite" color="#dcb525" size="1.5em" />;
    }
    return <IoStarOutline className="favorite" color="#dcb525" size="1.5em" />;
  };

  const toggleFavorite = async (isFav) => {
    if (user) {
      const { data } = await API.cityToFavorites(city.code_insee, isFav);
      if (data.status === 'added') {
        addToFavorites(city, isFav);
        toast.success(
          `${city.city_name} a bien été ajouté à ${
            isFav ? 'vos favoris' : 'votre blacklist'
          }`
        );
      } else if (data.status === 'removed') {
        removeFromFavorites(city, isFav);
        toast.success(
          `${city.city_name} a été retiré de ${
            isFav ? 'vos favoris' : 'votre blacklist'
          }`
        );
      } else if (data.status === 'updated') {
        updateFromFavorite(city);
        toast.success(
          `${city.city_name} a été déplacé dans ${
            isFav ? 'vos favoris' : 'votre blacklist'
          }`
        );
      }
    } else {
      toast.error(
        `Vous devez être connecté pour pouvoir ajouter une ville en ${
          isFav ? 'favoris' : 'blacklisté'
        }`
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const getCity = async () => {
      try {
        const data = await API.getCityByInsee(codeInsee);
        if (!data.city_name) throw new Error('City not found');
        setCity(data);
        const commerceMarkers =
          data.commerce !== null
            ? [...data.commerce].map((commerce) => {
                const coords = commerce.coordinates
                  .slice(1, -1)
                  .split(',')
                  .map((val) => +val);
                return {
                  type: commerce.type,
                  name: commerce.name,
                  coords,
                };
              })
            : [];
        const schoolsMarkers =
          data.schools !== null
            ? [...data.schools].map((schools) => {
                const coords = schools.coordinates
                  .slice(1, -1)
                  .split(',')
                  .map((val) => +val);
                return {
                  type: 'Ecole',
                  name: schools.name,
                  coords,
                };
              })
            : [];
        const healthInstitutionMarkers =
          data.health_institution !== null
            ? [...data.health_institution].map((healthInstitution) => {
                const coords = healthInstitution.coordinates
                  .slice(1, -1)
                  .split(',')
                  .map((val) => +val);
                return {
                  type: 'healthInstitution',
                  name: healthInstitution.categorie,
                  coords,
                };
              })
            : [];
        setMarkers([
          ...commerceMarkers,
          ...schoolsMarkers,
          ...healthInstitutionMarkers,
          {
            name: data.city_name,
            type: 'city',
            coords: [data.coordinates.x, data.coordinates.y],
          },
        ]);
        setMapCenter(data.coordinates.x, data.coordinates.y);
        setMapZoom(12);
      } catch (error) {
        return history.push('/404');
      } finally {
        setLoading(false);
      }
    };
    getCity();
  }, [codeInsee]);

  if (loading) return 'Loading...'; // TODO: Implementer un loader

  return (
    <div className="details__container">
      <div className="details__new__search" style={{ display: 'flex' }}>
        <Dropdown />
      </div>

      <div className="details__card">
        <div className="details__card__main">
          <BtnDesktop />
          <div className="details__card__titre">
            <p className="details__card__titre__p">{city.city_name}</p>
            <button
              className="details__card__button"
              type="button"
              onClick={() => toggleFavorite(true)}
            >
              {showFavorite()}
            </button>
            <button
              className="details__card__button"
              type="button"
              onClick={() => toggleFavorite(false)}
            >
              {showBan()}
            </button>
          </div>
          <div className="details__card__main__info">
            <ul className="details__card__main__ul">
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  Code Postal
                </span>{' '}
                : {city.code_postal[0]}
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  Couverture Fibre Internet
                </span>{' '}
                :{' '}
                {city.internet
                  ? `${city.internet[0].coverage}%`
                  : 'Non renseigné'}
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  Population
                </span>{' '}
                : {city.population}
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  Taxe foncière
                </span>{' '}
                :{' '}
                {city.taxation
                  ? city.taxation.map((tax) => (
                      <p key={tax.id}>
                        {tax.year} | <strong>{tax.housing_tax} %</strong>
                      </p>
                    ))
                  : 'réservé aux membres'}
              </li>
            </ul>
          </div>
        </div>

        {isMobile || isTablet ? (
          <div className="details__card__main__display__list">
            <ul className="details__card__main__ul">
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  <DropdownEtablissement data={city.health_institution} />
                </span>
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  <DropdownPersonnel data={city.personal_health} />
                </span>
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  <DropdownShop data={city.commerce} />
                </span>
              </li>
              <li className="details__card__main__li">
                <span className="details__card__main__li__infos">
                  <DropdownSchool data={city.schools} />
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="details__card__main__display">
            <div
              className={`details__card__main__display__parent ${
                !city.health_institution ? 'disabled' : ''
              } ${cards.health_institution ? 'active' : ''}`}
              // onClick={() => handleCards('health_institution')}
            >
              <div className="details__card__main__display__cadres">
                <GiHealthNormal
                  className="details__card__main__display__cadres__icon"
                  color="green"
                  size="2.6rem"
                />
                <span className="details__card__main__display__cadres__text">
                  {city.health_institution
                    ? `${city.health_institution.length} `
                    : ''}
                  Etablissement
                  {city.health_institution && city.health_institution.length > 1
                    ? `s`
                    : ''}{' '}
                  de santé
                </span>
              </div>
            </div>
            <div
              className={`details__card__main__display__parent ${
                !city.personal_health ? 'disabled' : ''
              } ${cards.personal_health ? 'active' : ''}`}
              // onClick={() => handleCards('personal_health')}
            >
              <div className="details__card__main__display__cadres">
                <GiHealing
                  className="details__card__main__display__cadres__icon"
                  color="green"
                  size="2.6rem"
                />
                <span className="details__card__main__display__cadres__text">
                  {city.personal_health
                    ? `${city.personal_health.length} `
                    : ''}
                  Personnel de santé
                </span>
              </div>
            </div>
            <div
              className={`details__card__main__display__parent ${
                !city.commerce ? 'disabled' : ''
              } ${cards.commerce ? 'active' : ''}`}
              // onClick={() => handleCards('commerce')}
            >
              <div className="details__card__main__display__cadres">
                <GiShop
                  className="details__card__main__display__cadres__icon"
                  color="green"
                  size="2.6rem"
                />
                <span className="details__card__main__display__cadres__text">
                  {city.commerce ? `${city.commerce.length} ` : ''}Commerce
                  {city.commerce && city.commerce.length > 1 ? `s` : ''}
                </span>
              </div>
            </div>
            <div
              className={`details__card__main__display__parent ${
                !city.schools ? 'disabled' : ''
              } ${cards.schools ? 'active' : ''}`}
              // onClick={() => handleCards('schools')}
            >
              <div className="details__card__main__display__cadres">
                <IoSchool
                  className="details__card__main__display__cadres__icon"
                  color="green"
                  size="2.6rem"
                />
                <span className="details__card__main__display__cadres__text">
                  {city.schools ? `${city.schools.length} ` : ''}Ecole
                  {city.schools && city.schools.length > 1 ? `s` : ''}
                </span>
              </div>
            </div>
            {/* {buttons.map(btn => (
              <Card
                key={btn.key}
                cardName={btn.cardName}
                handleCards={() => handleCards(btn.key)}
                isActive={!!cards[btn.key]}
                isDisabled={!city[btn.key]}
              >
                {btn.icon()}
              </Card>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
};
export default Details;
