import create from 'zustand';

const cityStore = create((set) => ({
  city: '',
  cities: [],
  setCity: (city) => set((state) => ({ ...state, city })),
  setCities: (cities) => set((state) => ({ ...state, cities })),
}));

export default cityStore;
