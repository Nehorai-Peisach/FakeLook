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
import Nofification from './Nofification';
import ProfilePage from './profile/Profile';
import { v4 as uuidv4 } from 'uuid';
import FullPost from './FullPost';

const TopBar = (props) => {
  const [cookies] = useCookies(['user']);
  const [btnClassname, setBtnClassname] = useState('media__hidden');
  const [btnContainerClassname, setBtnContainerClassname] = useState('media_container__hidden');
  const [nofiticationClassname, setNofiticationClassname] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notifyIconClassname, setNotifyIconClassname] = useState('');
  const [index, setIndex] = useState(1);

  const icons = [IoNotificationsOutline, IoImagesOutline, IoLocationOutline, IoAddCircleOutline, IoPersonOutline];
  let classes = ['', '', '', '', ''];
  for (let i = 1; i < classes.length; i++) {
    index === i ? (classes[i] = 'top_btn_color active media__hidden ' + btnClassname) : (classes[i] = 'top_btn_color ' + btnClassname);
  }
  const notificationHandler = () => {
    if (!nofiticationClassname) {
      setNofiticationClassname('notification');
      // Alerter('No New Messages!');
    } else setNofiticationClassname('');
  };

  const [searchedUsers, setSearchedUsers] = useState([]);
  const searchHandler = async (value) => {
    const result = await searchServices(value, cookies.user.data._id);
    setSearchedUsers(result);
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

  useEffect(() => {
    props.socket.on('like_notify', (data) => {
      if (data.post_info.user_id !== cookies.user.data._id) return;

      const tmp = {
        _id: uuidv4(),
        comment: { text: data.is_like ? 'Liked your post!' : 'Unliked your post!' },
        nickname: data.user_info.nickname,
        image_url: data.user_info.image_url,
        profile_url: data.user_info.profile_url,
        user_id: data.user_info.user_id,
      };
      setNotifications((pre) => [...pre, tmp]);
    });
  }, []);

  useEffect(() => {
    if (notifications.length > 0) setNotifyIconClassname('ball');
    else setNotifyIconClassname('ball disable');
  }, [notifications]);

  const postClickHandler = (input) => {
    console.log(input);
    const tmp = {
      post: { image_url: input.image_url },
      user: {},
    };
    // props.openClosePopup[0](
    //   <FullPost socket={props.socket} userClicked={props.userClicked} postDetails={input} openClosePopup={props.openClosePopup} />
    // );
  };
  const nameClickHandler = (id, removeId) => {
    props.userClicked(id);
    setNotifications((arr) => arr.filter((x) => x._id !== removeId));
  };

  return (
    <div className="top_bar">
      <div className={nofiticationClassname}>
        <IconBtn
          icon={icons[0]}
          className={nofiticationClassname ? 'top_btn_color notification_active' : 'top_btn_color'}
          onClick={notificationHandler}
        />
        <div className={'ball ' + notifyIconClassname}>+{notifications.length}</div>
        <div className="notification_container">
          {notifications.length > 0 ? (
            notifications.map((detail) => (
              <Nofification
                // bgClick={postClickHandler}
                bgClick={nameClickHandler}
                nicknameClick={nameClickHandler}
                detail={detail}
                className={'notification_container__items'}
              ></Nofification>
            ))
          ) : (
            <div className={'notification_container__items'}>Don't have any new messages!</div>
          )}
        </div>
      </div>
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
