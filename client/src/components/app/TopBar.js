import { IconBtn, SearchBar } from 'components/uiKit/UiKIt';
import { useEffect, useState } from 'react';
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
  const [btnClassname, setBtnClassname] = useState('media__hidden');
  const [btnContainerClassname, setBtnContainerClassname] = useState('media_container__hidden');
  const [index, setIndex] = useState(1);

  const icons = [IoNotificationsOutline, IoImagesOutline, IoLocationOutline, IoAddCircleOutline, IoPersonOutline];
  let classes = ['', '', '', '', ''];
  for (let i = 1; i < classes.length; i++) {
    index === i ? (classes[i] = 'top_btn_color active media__hidden ' + btnClassname) : (classes[i] = 'top_btn_color ' + btnClassname);
  }
  const alert = () => {
    Alerter('No New Messages!');
  };

  const [searchedUsers, setSearchedUsers] = useState([]);
  const searchHandler = async (value) => {
    const res = await searchServices(value, cookies.user.data._id);
    setSearchedUsers(res.data);
  };

  const [isDisplay, setIsDisplay] = useState(true);
  const [menuIcon, setMenuIcon] = useState(icons[1]);
  useEffect(() => {}, [menuIcon]);
  const menuHandler = async (num) => {
    setIndex(num);
    setIsDisplay((pre) => {
      if (pre) {
        setBtnClassname('media__display');
        setBtnContainerClassname('media_container__display');
      } else {
        setBtnClassname('media__hidden');
        setBtnContainerClassname('media_container__hidden');
      }
      return !pre;
    });
    setMenuIcon(icons[num]);
  };

  return (
    <div className="top_bar">
      <IconBtn icon={icons[0]} className="notification top_btn_color" onClick={alert} />
      <SearchBar list={searchedUsers} search={searchHandler} onClick={props.userClicked} />
      <div className="pages_btns media_container">
        <IconBtn
          icon={() => menuIcon}
          className={'pages_btns__menu transparent'}
          onClick={() => {
            menuHandler(index);
          }}
        />
        <IconBtn
          icon={icons[1]}
          className={classes[1]}
          onClick={() => {
            props.setCurrentPage(<FeedPage openClosePopup={props.openClosePopup} userClicked={props.userClicked} socket={props.socket} />);
            menuHandler(1);
          }}
        />
        <IconBtn
          icon={icons[2]}
          className={classes[2]}
          onClick={() => {
            props.setCurrentPage(<MapPage openClosePopup={props.openClosePopup} socket={props.socket} />);
            menuHandler(2);
          }}
        />
        <IconBtn
          icon={icons[3]}
          className={classes[3]}
          onClick={() => {
            props.setCurrentPage(<NewPostPage openClosePopup={props.openClosePopup} socket={props.socket} />);
            menuHandler(3);
          }}
        />
        <IconBtn
          icon={icons[4]}
          className={classes[4]}
          onClick={() => {
            props.userClicked(cookies.user.data._id);
            menuHandler(4);
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
