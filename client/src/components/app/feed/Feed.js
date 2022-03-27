import { Hr, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';
import Post from './Post';

const Feed = (props) => {
  const [cookies] = useCookies(['user']);
  const [posts, setPosts] = useState();

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    let result;
    if (posts) {
      result = await getFriendsPosts(cookies.user.data._id, posts.length);
      console.log(result);
    } else {
      result = await getFriendsPosts(cookies.user.data._id, 0);
    }
    setPosts(result);
  };

  props.socket.on('check_friends_posts', () => {
    const result = getFriendsPosts(cookies.user.data._id, posts.length);
    setPosts(...result.data);
  });

  const likeHandler = (post_id) => {
    console.log('like');
  };

  const commentHandler = () => {
    console.log('comment');
  };

  const userClicked = (id) => {
    props.userClicked(id);
  };

  return posts ? (
    <div className="feed">
      <h1 className="feed__header">Whats New?</h1>
      {posts.map((post, index) => {
        return (
          <Post
            key={'post' + index}
            userClicked={userClicked}
            postDetails={post}
            likeHandler={likeHandler}
            commentHandler={commentHandler}
          />
        );
      })}
      <Hr />
      <h1 className="feed__header">You see it all, add more friends to see their posts!</h1>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
