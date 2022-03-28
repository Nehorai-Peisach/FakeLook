import { RiSendPlaneFill } from 'react-icons/ri';
import { Hr, IconBtn, Input, Link, Loading } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useCookies } from 'react-cookie';
import Comment from './Comment';

const FullPost = (props) => {
  const [showFullPopup, closeFullPopup] = props.openClosePopup;
  const [like, setLike] = useState(props.isLike);
  const [imgUrl, setImgUrl] = useState();
  const [cookies] = useCookies(['user']);
  const [comment, setComment] = useState('');

  useEffect(async () => {
    const url = await storage.ref(`images/${props.postDetails.post.image_id}`).getDownloadURL();
    setImgUrl(url);
  }, [props.post]);

  const userClickHandler = () => {
    props.userClicked(props.postDetails.user._id);
    closeFullPopup();
  };
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
  let arr = [0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="full_post">
      <div className="full_post__img_container">{imgUrl ? <img className="full_post__img_container__img" src={imgUrl} /> : <Loading />}</div>
      <div className="full_post__ditails">
        <a className="header" onClick={userClickHandler}>
          <img className="profile_img" src={props.postDetails.user.image_url}></img>
          <p className="username">{props.postDetails.user.nickname}</p>
          <Hr />
        </a>
        <div className="comments_container">
          {arr.map(() => (
            <Comment />
          ))}
        </div>
        <div className="bottom">
          <Hr />
          <div className="bottom__header">
            <IconBtn onClick={likeHandler} icon={like ? IoHeart : IoHeartOutline} className="like_btn transparent"></IconBtn>
            <div className="bottom__header__text">{props.postDetails.post.text}</div>
          </div>
          <div className="comment_container">
            <Input className="comment_input" type="text">
              Send a comment...
            </Input>
            <IconBtn onClick={commentHandler} icon={RiSendPlaneFill} className="comment_btn"></IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
