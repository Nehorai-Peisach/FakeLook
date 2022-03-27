import { useEffect, useState } from 'react';
import FeedPage from './feed/Feed';
import ProfilePage from './profile/Profile';
import TopBar from './TopBar';
import UpdateNickname from './UpdateNickname';
import nicknameService from 'services/authServices/nicknameService';
import io from 'socket.io-client';
import Alerter from 'services/alertService/Alerter';
import { useCookies } from 'react-cookie';
import getProfileService from 'services/profileServices/getProfileService';
import FullPagePopup from 'components/uiKit/kit/layout/FullPagePopup';
import FullPost from './feed/FullPost';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';

const socket = io.connect('http://localhost:4005');

const Main = (props) => {
  const [userCookie, setUserCookie] = useCookies(['user']);
  const [currentPage, setCurrentPage] = useState();

  const nicknameHandler = async (nickname) => {
    if (userCookie.user.data) {
      const newUser = await nicknameService(userCookie.user.data._id, nickname);
      if (newUser) {
        setUserCookie('user', { data: newUser });
      } else Alerter('This nickname already been taken, use different one!');
    }
  };

  const userClicked = async (id) => {
    const profile = await getProfileService(id);
    setCurrentPage(<ProfilePage input={profile.data} socket={socket} />);
  };

  useEffect(async () => {
    setCurrentPage(<FeedPage userClicked={userClicked} socket={socket} />);
    const tmp = await getFriendsPosts(userCookie.user.data._id, 0);
    setPopup(<FullPost postDetails={tmp[0]} />);
  }, []);

  const [fullPopupClassname, setFullPopupClassname] = useState('full_popup__display');
  const [popup, setPopup] = useState(<div />);
  const showFullPopup = (popup) => {
    setPopup(popup);
    setFullPopupClassname('full_popup__display');
  };
  const closeFullPopup = () => {
    setPopup(<div />);
    setFullPopupClassname('full_popup__hidden');
  };

  return (
    <div>
      {userCookie.user.data ? (
        userCookie.user.data.nickname ? (
          <div className="main">
            <TopBar userClicked={userClicked} setCurrentPage={setCurrentPage} socket={socket} />
            {currentPage}
            <FullPagePopup popup={popup} close={closeFullPopup} className={fullPopupClassname} />
          </div>
        ) : (
          <UpdateNickname enterNickname={nicknameHandler} />
        )
      ) : (
        <div style={{ fontSize: '2rem' }}>
          Sorry can't enter FakeLook without Sign-in first.
          <a href="/"> To Sign-in</a>
        </div>
      )}
    </div>
  );
};

export default Main;
