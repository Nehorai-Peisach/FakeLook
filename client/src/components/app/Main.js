import { useState } from 'react';
import FeedPage from './feed/Feed';
import TopBar from './TopBar';
import UpdateNickname from './UpdateNickname';
import nicknameService from 'services/authServices/nicknameService';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import Alerter from 'services/alertService/Alerter';
const socket = io.connect('http://localhost:4005');
const cookies = new Cookies();

const Main = (props) => {
  const [user, setUser] = useState(cookies.get('user').data);
  const [currentPage, setCurrentPage] = useState(<FeedPage socket={socket} user={props.user} />);

  const nicknameHandler = async (nickname) => {
    if (user) {
      const newUser = await nicknameService(user._id, nickname);
      if (newUser) {
        cookies.set('user', newUser);
        setUser(newUser);
      } else Alerter('This nickname already been taken, use different one!');
    }
  };
  return (
    <div className="main">
      {user ? (
        user.nickname ? (
          <div>
            <TopBar user={user} setCurrentPage={setCurrentPage} socket={socket} />
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
