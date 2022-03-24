import { useState } from 'react';
import FeedPage from '../feed/Feed';
import MapPage from '../map/MapPage';
import NewPostPage from '../newPost/NewPost';
import ProfilePage from '../profile/Profile';
import TopBar from './TopBar';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4005');

const Main = (props) => {
  const [index, setIndex] = useState(0);
  const pages = [
    <FeedPage socket={socket} user={props.user} />,
    <MapPage />,
    <NewPostPage user={props.user} socket={socket} />,
    <ProfilePage />
  ];

  return (
    <div className="main">
      <TopBar current={index} to={setIndex} />
      {pages[index]}
    </div>
  );
};

export default Main;
