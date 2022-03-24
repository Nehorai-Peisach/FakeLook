import { useState } from 'react';
import FeedPage from '../feed/Feed';
import MapPage from '../map/MapPage';
import NewPostPage from '../newPost/NewPost';
import ProfilePage from '../profile/Profile';
import TopBar from './TopBar';
import UpdateNickname from './UpdateNickname';
import nicknameService from 'services/authServices/nicknameService';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4005');

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const Main = (props) => {
  const [user, setUser] = useState(cookies.get('user').data);
  const [index, setIndex] = useState(0);
  const pages = [
    <FeedPage socket={socket} user={props.user} />,
    <MapPage />,
    <NewPostPage user={props.user} socket={socket} />,
    <ProfilePage />
  ];

  const nicknameHandler = async (nickname) => {
    if (user) {
      const newUser = await nicknameService(user._id, nickname);
      cookies.set('user', newUser);
      setUser(newUser);
    }
  };
  return (
    <div className="main">
      {user ? (
        user.nickname ? (
          <div>
            <TopBar user={user} current={index} to={setIndex} />
            {pages[index]}
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
