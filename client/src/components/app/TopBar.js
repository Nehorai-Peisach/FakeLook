import { IconBtn, SearchBar } from 'components/uiKit/UiKIt';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoPersonOutline, IoAddCircleOutline, IoImagesOutline, IoLocationOutline, IoNotificationsOutline } from 'react-icons/io5';
import Alerter from 'services/alertService/Alerter';
import getProfileService from 'services/profileServices/getProfileService';
import searchServices from 'services/searchServices/searchServices';
import FeedPage from './feed/Feed';
import MapPage from './map/MapPage';
import NewPostPage from './newPost/NewPost';
import ProfilePage from './profile/Profile';

const TopBar = (props) => {
  const [cookies] = useCookies(['user']);
  const [index, setIndex] = useState(0);
  let classes = ['', '', '', ''];
  for (let i = 0; i < classes.length; i++) {
    index === i ? (classes[i] = 'top_btn_color active') : (classes[i] = 'top_btn_color');
  }
  const alert = () => {
    Alerter('No New Messages!');
  };

  const [searchedUsers, setSearchedUsers] = useState([]);
  const searchHandler = async (value) => {
    const res = await searchServices(value, cookies.user.data._id);
    setSearchedUsers(res.data);
  };

  return (
    <div className="top_bar">
      <IconBtn icon={IoNotificationsOutline} className="notification top_btn_color" onClick={alert} />
      <SearchBar list={searchedUsers} search={searchHandler} onClick={props.userClicked} />
      <div className="pages_btns">
        <IconBtn
          icon={IoImagesOutline}
          className={classes[0]}
          onClick={() => {
            setIndex(0);
            props.setCurrentPage(<FeedPage userClicked={props.userClicked} socket={props.socket} />);
          }}
        />
        <IconBtn
          icon={IoLocationOutline}
          className={classes[1]}
          onClick={() => {
            setIndex(1);
            props.setCurrentPage(<MapPage />);
          }}
        />
        <IconBtn
          icon={IoAddCircleOutline}
          className={classes[2]}
          onClick={() => {
            setIndex(2);
            props.setCurrentPage(<NewPostPage socket={props.socket} />);
          }}
        />
        <IconBtn
          icon={IoPersonOutline}
          className={classes[3]}
          onClick={() => {
            setIndex(3);
            props.userClicked(cookies.user.data._id);
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
