import { useEffect, useState } from 'react';
import FeedPage from './feed/Feed';
import TopBar from './TopBar';
import UpdateNickname from './UpdateNickname';
import nicknameService from 'services/authServices/nicknameService';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import Alerter from 'services/alertService/Alerter';
import { useCookies } from 'react-cookie';
const socket = io.connect('http://localhost:4005');
const cookies = new Cookies();

const Main = (props) => {
  const [userCookie, setUserCookie] = useCookies(['user']);
  const [currentPage, setCurrentPage] = useState(<FeedPage socket={socket} user={props.user} />);

  const nicknameHandler = async (nickname) => {
    if (userCookie.user.data) {
      const newUser = await nicknameService(userCookie.user.data._id, nickname);
      if (newUser) {
        setUserCookie('user', { data: newUser });
      } else Alerter('This nickname already been taken, use different one!');
    }
  };
  return (
    <div className="main">
      {userCookie.user.data ? (
        userCookie.user.data.nickname ? (
          <div>
            <TopBar user={userCookie.user.data} setUser={setUserCookie} setCurrentPage={setCurrentPage} socket={socket} />
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
