import React, { useEffect, useState } from 'react';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';
import Post from './Post';

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    let result;
    if (posts) {
      result = await getFriendsPosts(props.user._id, posts.length);
      console.log(result);
    } else {
      result = await getFriendsPosts(props.user._id, 0);
      console.log(result);
    }
    setPosts(result);
  };

  props.socket.on('check_friends_posts', () => {
    const result = getFriendsPosts(props.user._id, posts.length);
    setPosts(...result.data);
  });

  const likeHandler = (post_id) => {
    console.log('like');
  };

  const commentHandler = () => {
    console.log('comment');
  };

  return (
    <div>
      <h1>Whats New?</h1>
      {posts.map((post) => {
        return (
          <Post
            post={post}
            likeHandler={likeHandler}
            commentHandler={commentHandler}
          />
        );
      })}
      <Post likeHandler={likeHandler} commentHandler={commentHandler} />
    </div>
  );
};

export default Feed;
