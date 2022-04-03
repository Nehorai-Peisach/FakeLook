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
    setCurrentPage(
      <ProfilePage
        openClosePopup={[showFullPopup, closeFullPopup]}
        userClicked={userClicked}
        input={profile}
        socket={socket}
      />
    );
  };

  useEffect(async () => {
    setCurrentPage(
      <FeedPage
        openClosePopup={[showFullPopup, closeFullPopup]}
        userClicked={userClicked}
        socket={socket}
      />
    );
  }, []);

  const [fullPopupClassname, setFullPopupClassname] = useState('full_popup__hidden');
  const [popup, setPopup] = useState(<div />);
  const showFullPopup = (popup) => {
    setPopup(popup);
    setFullPopupClassname('full_popup__display');
  };
  const closeFullPopup = () => {
    setPopup(<div />);
    setFullPopupClassname('full_popup__hidden');
  };
  const openClosePopup = [showFullPopup, closeFullPopup];

  const [user, setUser] = useState();
  useEffect(() => {
    if (userCookie.user && userCookie.user.data) setUser(userCookie.user.data);
    else setUser();
  }, [userCookie]);

  return (
    <div>
      {user ? (
        user.nickname ? (
          <div className="main">
            <TopBar
              openClosePopup={openClosePopup}
              userClicked={userClicked}
              setCurrentPage={setCurrentPage}
              socket={socket}
            />
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
