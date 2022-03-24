import { useState } from 'react';
import FeedPage from '../feed/Feed';
import MapPage from '../map/MapPage';
import NewPostPage from '../newPost/NewPost';
import ProfilePage from '../profile/Profile';
import TopBar from './TopBar';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:4005');

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const Main = (props) => {
  const user = cookies.get('user');
  const [index, setIndex] = useState(0);
  const pages = [
    <FeedPage socket={socket} user={props.user} />,
    <MapPage />,
    <NewPostPage user={props.user} socket={socket} />,
    <ProfilePage />
  ];

  return (
    <div className="main">
      {user ? (
        <div>
          <TopBar current={index} to={setIndex} />
          {pages[index]}
        </div>
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
