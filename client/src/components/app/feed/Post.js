import { IconBtn, Input, Link } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { RiSendPlaneFill } from 'react-icons/ri';

const Post = (props) => {
  const [user, setUser] = useCookies(['user']);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // if (props.post) {
    //   //let isLiked = props.post.users_like.find(user.data._id);
    //   if (isLiked) setLike(true);
    //   else setLike(false);
    // }
  }, [props.post]);

  const likeHandler = () => {
    setLike(!like);
    props.likeHandler();
  };

  const commentHandler = () => {
    const newComment = {
      text: comment,
      user_id: user.data._id,
      post_id: props.post._id
    };
    props.commentHandler(newComment);
  };

  return (
    <div className="post">
      <div className="header">
        <img
          className="profile_img"
          src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
        ></img>
        <p className="username">demo</p>
      </div>
      <div className="img_container">
        <img
          className="img"
          src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg"
        ></img>
      </div>
      <div className="bottom">
        <div className="bottom_header">
          <IconBtn
            onClick={likeHandler}
            icon={like ? IoHeart : IoHeartOutline}
            className="like_btn transparent"
          ></IconBtn>
          <Link className="view_comments">
            View all {!(props.comments && props.comments.length) && 0} comments
          </Link>
        </div>
        <div className="comment_container">
          <Input className="comment_input" type="text">
            Send a comment...
          </Input>
          <IconBtn
            onClick={commentHandler}
            icon={RiSendPlaneFill}
            className="comment_btn"
          ></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default Post;
