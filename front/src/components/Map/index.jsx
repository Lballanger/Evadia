/* eslint-disable react/react-in-jsx-scope */
import { MapContainer, TileLayer } from 'react-leaflet';
import React from 'react';

import './styles.scss';

const Map = () => (
  <div className="map__container">
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </div>
);

export default Map;
