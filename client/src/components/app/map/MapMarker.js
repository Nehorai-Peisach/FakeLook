import { storage } from 'firebases';
import React, { useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import getProfileService from 'services/profileServices/getProfileService';

const MapMarker = (props) => {
  const [user, setUser] = useState({});
  const [imgRef, setImgRef] = useState('');
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  useEffect(async () => {
    const result = await getProfileService(props.post.user_id);
    setUser(result.data);
    const url = await storage
      .ref(`images/${props.post.image_id}`)
      .getDownloadURL();
    setImgRef(url);
  }, []);

  useEffect(() => {
    if (refReady) popupRef.openOn(props.map);
  }, [refReady]);

  return (
    <Marker position={[props.post.location.lat, props.post.location.lng]}>
      <Popup
        className="popup"
        autoClose={false}
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        <label onClick={() => console.log('go to post')}>
          <div className="popup__header">
            <img
              className="popup__header__img"
              src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
            />
            <p className="popup__header__name">{user.nickname}</p>
          </div>
          <img className="popup__img" src={imgRef} />
        </label>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
