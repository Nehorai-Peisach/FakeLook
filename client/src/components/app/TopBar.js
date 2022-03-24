import { IconBtn, SearchBar } from 'components/uiKit/UiKIt';
import { useState } from 'react';
import { IoPersonOutline, IoAddCircleOutline, IoImagesOutline, IoLocationOutline, IoNotificationsOutline } from 'react-icons/io5';
import {
  IoPersonOutline,
  IoAddCircleOutline,
  IoImagesOutline,
  IoLocationOutline,
  IoNotificationsOutline
} from 'react-icons/io5';
import Alerter from 'services/alertService/Alerter';
import searchServices from 'services/searchServices/searchServices';

const TopBar = (props) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  let classes = ['', '', '', ''];
  for (let i = 0; i < classes.length; i++) {
    props.current === i
      ? (classes[i] = 'top_btn_color active')
      : (classes[i] = 'top_btn_color');
  }
  const alert = () => {
    Alerter('No New Messages!');
  };

  const searchHandler = async (value) => {
    if (!props.user) return;
    
    const res = await searchServices(value, props.user._id);
    setSearchedUsers(res.data);
  };

  const userClicked = async (id) => {
    console.log('User clicked: ' + id);
  };

  return (
    <div className="top_bar">
      <IconBtn icon={IoNotificationsOutline} className="notification top_btn_color" click={alert} />
      <SearchBar list={searchedUsers} search={searchHandler} onClick={userClicked} />
      <div className="pages_btns">
        <IconBtn
          icon={IoImagesOutline}
          className={classes[0]}
          onClick={() => props.to(0)}
        />
        <IconBtn
          icon={IoLocationOutline}
          className={classes[1]}
          onClick={() => props.to(1)}
        />
        <IconBtn
          icon={IoAddCircleOutline}
          className={classes[2]}
          onClick={() => {
            props.to(2);
            console.log('hey');
          }}
        />
        <IconBtn
          icon={IoPersonOutline}
          className={classes[3]}
          onClick={() => props.to(3)}
        />
      </div>
    </div>
  );
};

export default TopBar;
