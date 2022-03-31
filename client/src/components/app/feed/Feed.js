import { Hr, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';
import Post from './Post';

const Feed = (props) => {
  const [cookies] = useCookies(['user']);
  const [posts, setPosts] = useState();

  useEffect(() => {
    loadPhotos(0);
  }, []);

  const loadPhotos = async (index) => {
    let result;
    if (posts || index !== 0) {
      result = await getFriendsPosts(cookies.user.data._id, posts.length);
    } else {
      result = await getFriendsPosts(cookies.user.data._id, 0);
    }
    console.log(result)
    if (result === null) window.location.href = '/';
    setPosts(result);
  };

  props.socket.on('check_friends_posts', () => {
    loadPhotos(0);
  });

  return posts ? (
    <div className="feed">
      <h1 className="feed__header">Whats New?</h1>
      {posts.map((post, index) => {
        return (
          <Post
            key={'post' + index}
            socket={props.socket}
            userClicked={props.userClicked}
            postDetails={post}
            openClosePopup={props.openClosePopup}
          />
        );
      })}
      <Hr />
      <h1 className="feed__header">
        You've seen it all, add more friends to see their posts!
      </h1>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
