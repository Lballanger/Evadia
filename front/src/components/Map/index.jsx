/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';

import './styles.scss';

const Map = () => {
  const position = [48.862725, 2.287592];
  return (
    <div>
      <MapContainer
        center={position}
        zoom={10}
        className="map__container"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Nom de la ville.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

{
  /* <MapContainer center={start_coordinate} zoom={10} scrollWheelZoom={false}>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
<Marker position={start_coordinate} icon={positionIcon} />
<Marker position={end_coordinate} icon={positionIcon} />
</MapContainer> */
}
