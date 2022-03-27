import { IconBtn, Input, Link, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { RiSendPlaneFill } from 'react-icons/ri';
import { storage } from 'firebases';

const Post = (props) => {
  const [cookies] = useCookies(['user']);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
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
    props.likeHandler();
  };

  const commentHandler = () => {
    const newComment = {
      text: comment,
      user_id: cookies.user.data._id,
      post_id: props.post._id,
    };
    props.commentHandler(newComment);
  };

  const userClicked = () => {
    props.userClicked(props.postDetails.user._id);
  };

  //https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=
  //https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg
  return (
    <div className="post">
      <a className="header" onClick={() => userClicked()}>
        <img className="profile_img" src={props.postDetails.user.image_url}></img>
        <p className="username">{props.postDetails.user.nickname}</p>
      </a>
      <div className="img_container">{img ? <img className="img" src={img}></img> : <Loading className="img" />}</div>
      <div className="bottom">
        <div className="bottom_header">
          <IconBtn onClick={likeHandler} icon={like ? IoHeart : IoHeartOutline} className="like_btn transparent"></IconBtn>
          <Link className="view_comments">View all {props.postDetails.post.users_like.length} comments</Link>
        </div>
        <div className="comment_container">
          <Input className="comment_input" type="text">
            Send a comment...
          </Input>
          <IconBtn onClick={commentHandler} icon={RiSendPlaneFill} className="comment_btn"></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default Post;
