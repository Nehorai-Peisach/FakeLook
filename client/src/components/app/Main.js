import { useEffect, useState } from 'react';
import FeedPage from './feed/Feed';
import ProfilePage from './profile/Profile';
import TopBar from './TopBar';
import UpdateNickname from './UpdateNickname';
import nicknameService from 'services/authServices/nicknameService';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import Alerter from 'services/alertService/Alerter';
import { useCookies } from 'react-cookie';
import getProfileService from 'services/profileServices/getProfileService';

const socket = io.connect('http://localhost:4005');
const cookies = new Cookies();

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
    setCurrentPage(<ProfilePage input={profile.data} />);
  };

  useEffect(() => {
    setCurrentPage(<FeedPage userClicked={userClicked} socket={socket} />);
  }, []);

  return (
    <div>
      {userCookie.user.data ? (
        userCookie.user.data.nickname ? (
          <div className="main">
            <TopBar  userClicked={userClicked} setCurrentPage={setCurrentPage} socket={socket} />
            {currentPage}
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
