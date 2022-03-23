import { useState } from 'react';
import FeedPage from '../feed/Feed';
import MapPage from '../map/Map';
import NewPostPage from '../newPost/NewPost';
import ProfilePage from '../profile/Profile';
import TopBar from './TopBar';

const Main = (props) => {
  const [index, setIndex] = useState(0);
  const pages = [<FeedPage />, <MapPage />, <NewPostPage />, <ProfilePage />];

  return (
    <div className="main">
      <TopBar current={index} to={setIndex} />
      {pages[index]}
    </div>
  );
};

export default Main;
