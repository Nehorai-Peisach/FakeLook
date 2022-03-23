import React, { useEffect, useState } from 'react';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';
import Post from './Post';

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const result = getFriendsPosts(props.user._id, posts.length);
//     setPosts(...result.data);
//   }, [posts]);

//   props.socket.on('check_friends_posts', () => {
//     const result = getFriendsPosts(props.user._id, posts.length);
//     setPosts(...result.data);
//   });

  return (
    <div>
      <h1>Whats New?</h1>
      {posts.map((post) => {
        return <Post postData={post} />;
      })}
      <Post />
    </div>
  );
};

export default Feed;
