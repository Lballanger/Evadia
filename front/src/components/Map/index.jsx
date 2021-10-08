/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import MarkerIcon from '../../assets/images/marker.svg';
import 'leaflet/dist/leaflet.css';
import './styles.scss';
import mapStore from '../../store/map';

const iconPerson = new L.Icon({
  iconUrl: MarkerIcon,
  iconSize: new L.Point(30, 30),
  shadowSize: 10,
  // className: 'leaflet-div-icon',
});

const mapStyle = {
  position: 'fixed',
  inset: '0',
};

const Map = ({ location: { pathname } }) => {
  const markers = mapStore((state) => state.markers);
  const center = mapStore((state) => state.center);
  const zoom = mapStore((state) => state.zoom);
  const [mapView, setMapView] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = pathname.split('/')[1];
    if (path === 'details' || path === 'results') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (mapView) {
      mapView.flyTo(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div
      style={
        isVisible
          ? { ...mapStyle, visibility: 'visible', pointerEvents: 'auto' }
          : {
              ...mapStyle,
              visibility: 'hidden',
              pointerEvents: 'none',
              zIndex: -1,
            }
      }
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="map__container"
        zoomControl={false}
        doubleClickZoom
        whenCreated={setMapView}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {markers.map((marker, index) => (
          <Marker
            // eslint-disable-next-line react/no-array-index-key
            key={`${marker.name}-${index}`}
            position={marker.coords}
            icon={iconPerson}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Map);
