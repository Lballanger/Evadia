/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useRef, useState } from 'react';
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
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import CityIcon from '../../assets/images/city.svg';
import BabyIcon from '../../assets/images/baby.svg';
import BakeryIcon from '../../assets/images/bakery.svg';
import BankIcon from '../../assets/images/bank.svg';
import BooksIcon from '../../assets/images/books.svg';
import ClothsIcon from '../../assets/images/cloths.svg';
import FastFoodIcon from '../../assets/images/fast_food.svg';
import HealthInstitutionIcon from '../../assets/images/health_institution.svg';
import MarketIcon from '../../assets/images/market.svg';
import NurseIcon from '../../assets/images/nurse.svg';
import RestaurantIcon from '../../assets/images/restaurant.svg';
import SchoolIcon from '../../assets/images/school.svg';
import ToiletIcon from '../../assets/images/toilet.svg';
import AnimalIcon from '../../assets/images/animal.svg';
import VehicleIcon from '../../assets/images/vehicle.svg';
import PostIcon from '../../assets/images/post.svg';
import BarIcon from '../../assets/images/bar.svg';
import TobaccoIcon from '../../assets/images/tobacco.svg';
import LocalMarketIcon from '../../assets/images/localmarket.svg';
import FloristIcon from '../../assets/images/florist.svg';
import HairdresserIcon from '../../assets/images/hairdresser.svg';
import OpticianIcon from '../../assets/images/optician.svg';
import BeautyIcon from '../../assets/images/beauty.svg';
import 'leaflet/dist/leaflet.css';
import './styles.scss';
import mapStore from '../../store/map';

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
  const [mapKey, setMapKey] = useState(new Date().getTime());

  useEffect(() => {
    setMapKey(new Date().getTime());
  }, [markers]);

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

  const getIcon = (type) => {
    switch (type) {
      case 'city':
        return new L.Icon({
          iconUrl: CityIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'baby':
        return new L.Icon({
          iconUrl: BabyIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'bakery':
        return new L.Icon({
          iconUrl: BakeryIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'bank':
        return new L.Icon({
          iconUrl: BankIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'books':
        return new L.Icon({
          iconUrl: BooksIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'cloths':
        return new L.Icon({
          iconUrl: ClothsIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'fast_food':
        return new L.Icon({
          iconUrl: FastFoodIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'healthInstitution':
        return new L.Icon({
          iconUrl: HealthInstitutionIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'supermarket':
        return new L.Icon({
          iconUrl: MarketIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'nurse':
        return new L.Icon({
          iconUrl: NurseIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'restauration':
        return new L.Icon({
          iconUrl: RestaurantIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'Ecole':
        return new L.Icon({
          iconUrl: SchoolIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'toilet':
        return new L.Icon({
          iconUrl: ToiletIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'animal':
        return new L.Icon({
          iconUrl: AnimalIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'vehicle':
        return new L.Icon({
          iconUrl: VehicleIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'post_office':
        return new L.Icon({
          iconUrl: PostIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'bar':
        return new L.Icon({
          iconUrl: BarIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'tobacco':
        return new L.Icon({
          iconUrl: TobaccoIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'caterer':
      case 'butcher':
        return new L.Icon({
          iconUrl: LocalMarketIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'florist':
        return new L.Icon({
          iconUrl: FloristIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'hairdresser':
        return new L.Icon({
          iconUrl: HairdresserIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'optician':
        return new L.Icon({
          iconUrl: OpticianIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      case 'beauty':
        return new L.Icon({
          iconUrl: BeautyIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
      default:
        return new L.Icon({
          iconUrl: MarketIcon,
          iconSize: new L.Point(40, 40),
          shadowSize: 10,
        });
    }
  };

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
        scrollWheelZoom
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
        <MarkerClusterGroup
          key={mapKey}
          spiderfyDistanceMultiplier={1}
          showCoverageOnHover={false}
        >
          {markers.map((marker, index) => (
            <Marker
              // eslint-disable-next-line react/no-array-index-key
              key={`${marker.name}-${index}`}
              position={marker.coords}
              icon={getIcon(marker.type)}
            >
              <Popup>{marker.name || 'introuvable'}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
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
