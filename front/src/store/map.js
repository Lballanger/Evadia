import create from 'zustand';
import { devtools } from 'zustand/middleware';

const mapStore = create(
  devtools((set) => ({
    showMap: false,
    center: {
      lat: 46.82414087601361,
      lng: 2.6038539530657316,
    },
    zoom: 12,
    markers: [],
    setMapCenter: (lat, lng) =>
      set((state) => ({
        ...state,
        center: { lat, lng },
      })),
    setMapZoom: (zoom) => set((state) => ({ ...state, zoom })),
    setMarkers: (markers) => set((state) => ({ ...state, markers })),
    setShowMap: (value) => set((state) => ({ ...state, showMap: value })),
  }))
);

export default mapStore;
