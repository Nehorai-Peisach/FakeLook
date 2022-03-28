import { IconBtn, Input, Link, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { RiSendPlaneFill } from 'react-icons/ri';
import { storage } from 'firebases';
import FullPost from '../FullPost';

const Post = (props) => {
  const [showFullPopup, closeFullPopup] = props.openClosePopup;
  const [cookies] = useCookies(['user']);
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(false);
  const [img, setImg] = useState();

  useEffect(async () => {
    if (props.postDetails) {
      let isLiked = props.postDetails.post.users_like.includes(cookies.user.data._id);
      if (isLiked) setLike(true);
      else setLike(false);

      const url = await storage.ref(`images/${props.postDetails.post.image_id}`).getDownloadURL();
      setImg(url);
    }
  }, [props.postDetails]);

  const likeHandler = () => {
    setLike(!like);
    props.likeHandler(props.postDetails.post._id, props.postDetails.user._id);
  };

  const commentHandler = () => {
    const newComment = {
      text: comment,
      user_id: cookies.user.data._id,
      post_id: props.postDetails.post._id
    };
    props.commentHandler(newComment, props.postDetails.user._id);
  };

  const userClicked = () => {
    props.userClicked(props.postDetails.user._id);
  };

  const openFull = () => {
    console.log('full');
    showFullPopup(
      <FullPost
        userClicked={props.userClicked}
        postDetails={props.postDetails}
        likeHandler={likeHandler}
        isLike={like}
        commentHandler={props.commentHandler}
        openClosePopup={props.openClosePopup}
      />
    );
  };

  return (
    <div className="post">
      <a className="header" onClick={() => userClicked()}>
        <img className="profile_img" src={props.postDetails.user.image_url}></img>
        <p className="username">{props.postDetails.user.nickname}</p>
      </a>
      <div className="img_container">{img ? <img className="img" src={img} onClick={openFull}></img> : <Loading className="img" />}</div>
      <div className="bottom">
        <div className="bottom__header">
          <IconBtn onClick={likeHandler} icon={like ? IoHeart : IoHeartOutline} className="like_btn transparent"></IconBtn>
          <Link className="view_comments" onClick={openFull}>
            View all {props.postDetails.post.users_like.length} comments
          </Link>
        </div>
        <div className="bottom__text">{props.postDetails.post.text}</div>
        <div className="comment_container">
          <Input
            className="comment_input"
            type="text"
            onChange={(value) => {
              setComment(value);
            }}
          >
            Send a comment...
          </Input>
          <IconBtn onClick={commentHandler} icon={RiSendPlaneFill} className="comment_btn"></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default Post;
