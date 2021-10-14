/* eslint-disable prefer-destructuring */
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const cityStore = create(
  devtools((set, get) => ({
    city: '',
    cities: [],
    favorites: [],
    setCity: (city) => {
      const favorites = get().favorites;
      const isFavorite = favorites.find(
        (favorite) => favorite.commune_id === city.code_insee
      );
      const cityWithFavorite = {
        ...city,
        is_favorite:
          isFavorite && isFavorite.is_favorite ? isFavorite.is_favorite : null,
      };
      return set((state) => ({ ...state, city: cityWithFavorite }));
    },
    setCities: (cities) => {
      const favorites = get().favorites;
      const citiesWithFavorite = cities.map((city) => {
        const isFavorite = favorites.find(
          (favorite) => favorite.commune_id === city.code_insee
        );
        return {
          ...city,
          is_favorite:
            isFavorite && isFavorite.is_favorite
              ? isFavorite.is_favorite
              : null,
        };
      });
      return set((state) => ({ ...state, cities: citiesWithFavorite }));
    },
    setFavorites: (favorites) => set((state) => ({ ...state, favorites })),
    addToFavorites: (city, isFav) => {
      const favorites = [...get().favorites];
      const cityState = { ...get().city };
      const favorite = favorites.find(
        (fav) => fav.commune_id === city.code_insee
      );
      console.log(favorite);
      if (favorite && favorite.is_favorite === false) {
        const favoriteIndex = favorites.findIndex(
          (fav) => fav.commune_id === city.code_insee
        );
        favorites[favoriteIndex].is_favorite = isFav;
      } else if (!favorite) {
        favorites.push({
          id: new Date().getTime(),
          commune_id: city.code_insee,
          is_favorite: isFav,
          details: {
            city_name: city.city_name,
            population: city.population,
            coordinates: [city.coordinates.x, city.coordinates.y],
          },
          created_at: new Date().toISOString(),
        });
      }
      if (city.code_insee === cityState.code_insee) {
        return set((state) => ({
          ...state,
          favorites,
          city: { ...state.city, is_favorite: isFav },
        }));
      }
      return set((state) => ({
        ...state,
        favorites,
      }));
    },
    removeFromFavorites: (city) => {
      const favorites = [...get().favorites].filter(
        (favorite) => favorite.commune_id !== city.code_insee
      );
      const cityState = { ...get().city };
      if (city.code_insee === cityState.code_insee) {
        return set((state) => ({
          ...state,
          favorites,
          city: { ...state.city, is_favorite: null },
        }));
      }
      return set((state) => ({
        ...state,
        favorites,
      }));
    },
    updateFromFavorite: (city) => {
      const favorites = [...get().favorites];
      const updatedFavorites = favorites.map((favorite) => {
        const favoriteCopy = { ...favorite };
        if (favoriteCopy.commune_id === city.code_insee) {
          favoriteCopy.is_favorite = !favoriteCopy.is_favorite;
        }
        return favoriteCopy;
      });
      const cityState = { ...get().city };
      if (city.code_insee === cityState.code_insee) {
        return set((state) => ({
          ...state,
          favorites: updatedFavorites,
          city: { ...state.city, is_favorite: !state.city.is_favorite },
        }));
      }
      return set((state) => ({
        ...state,
        favorites: updatedFavorites,
      }));
    },
  }))
);

export default cityStore;
