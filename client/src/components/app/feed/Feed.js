import { Hr, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import getFriendsPosts from 'services/feedServices/getFriendsPosts';
import commentService from 'services/postServices/commentService';
import likeService from 'services/postServices/likeService';
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
    setPosts(result);
  };

  props.socket.on('check_friends_posts', () => {
    loadPhotos(0);
  });

  const likeHandler = (post_id, postAuthor_id) => {
    likeService(
      { user_id: cookies.user.data._id, post_id: post_id },
      postAuthor_id,
      props.socket
    );
  };

  const commentHandler = (comment, postAuthor_id) => {
    commentService(comment, postAuthor_id, props.socket);
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
            openClosePopup={props.openClosePopup}
          />
        );
      })}
      <Hr />
      <h1 className="feed__header">
        You see it all, add more friends to see their posts!
      </h1>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
