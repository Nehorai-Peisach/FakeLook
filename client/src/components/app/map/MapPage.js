import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { Map, Icon } from 'leaflet';
import { Btn, IconBtn, Input } from 'components/uiKit/UiKIt';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMapPin } from 'react-icons/bi';

const MapPage = (props) => {
  const [position, setPosition] = useState();
  const [map, setMap] = useState();

  const [filterStyle, setFilterStyle] = useState({
    width: '0px'
  });
  const [btnFilterStyle, setBtnFilterStyle] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    goHome();
  }, []);

  useEffect(() => {
    if (position)
      map?.flyTo({ lat: position.latitude, lng: position.longitude }, 17);
  }, [position]);

  const goHome = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        console.log(data.coords);

        setPosition({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const filtersMenu = () => {
    if (!flag) {
      setBtnFilterStyle({
        transform: 'rotate(90deg)'
      });
      setFilterStyle({
        width: '400px'
      });
    } else {
      setBtnFilterStyle({
        transform: 'rotate(0deg)'
      });
      setFilterStyle({
        width: '0px'
      });
    }
    setFlag(!flag);
  };

  return (
    <div className="map">
      <div className="map__filters" style={filterStyle}>
        <div>
          <input type="date" />
        </div>
        <input type="date" className="map__filters_input" />
        <input type="number" placeholder="radius" />
        <input type="text" placeholder="friend" />
        <input type="text" placeholder="tags" />
        <input type="text" placeholder="friend Group" />
      </div>
      <div>
        <IconBtn
          className="map__btn__filters blue"
          style={btnFilterStyle}
          icon={BiMapPin}
          onClick={filtersMenu}
        ></IconBtn>
        <IconBtn
          className="map__btn__filters blue"
          icon={AiOutlineHome}
          onClick={goHome}
        ></IconBtn>
      </div>
      <MapContainer
        whenCreated={setMap}
        className="map__container"
        center={[32.109333, 34.855499]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={[51.505, -0.09]} radius={200} />
        <Marker position={[51.505, -0.09]}>
          test
          <Popup className="popup">
            <label onClick={() => console.log('go to post')}>
              <div className="popup__header">
                <img
                  className="popup__header__img"
                  src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                />
                <p className="popup__header__name">demo</p>
              </div>
              <img
                className="popup__img"
                src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg"
              />
            </label>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
