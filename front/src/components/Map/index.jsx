/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Map = ({ cities }) => {
  const position = [48.862725, 2.287592];
  return (
    <div>
      <MapContainer center={position} zoom={10} className="map__container">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {cities.map((city) => (
          <Marker position={city.coords}>
            <Popup>{city.city_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
Map.propTypes = PropTypes.shape({
  cities: PropTypes.arrayOf({
    city_name: PropTypes.string,
    population: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }),
}).isRequired;
export default Map;
