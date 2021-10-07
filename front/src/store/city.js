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
        is_favorite: isFavorite ? isFavorite.is_favorite : null,
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
          is_favorite: isFavorite ? isFavorite.is_favorite : null,
        };
      });
      return set((state) => ({ ...state, cities: citiesWithFavorite }));
    },
    setFavorites: (favorites) => set((state) => ({ ...state, favorites })),
    addToFavorites: (city) => {
      const favorites = [...get().favorites];
      const cityState = { ...get().city };
      const favorite = favorites.find(
        (fav) => fav.commune_id === city.code_insee
      );
      if (favorite && favorite.is_favorite === false) {
        const favoriteIndex = favorites.findIndex(
          (fav) => fav.commune_id === city.code_insee
        );
        favorites[favoriteIndex].is_favorite = true;
      } else if (!favorite) {
        favorites.push({
          id: new Date().getTime(),
          commune_id: city.code_insee,
          is_favorite: true,
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
          city: { ...state.city, is_favorite: true },
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
  }))
);

export default cityStore;
