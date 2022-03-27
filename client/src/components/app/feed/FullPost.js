import { RiSendPlaneFill } from 'react-icons/ri';
import { IconBtn, Input, Link } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const FullPost = (props) => {
  const [like, setLike] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  useEffect(async () => {
    const url = await storage.ref(`images/${props.postDetails.post.image_id}`).getDownloadURL();
    setImgUrl(url);
  }, [props.post]);

  const userClickHandler = () => {};
  const likeHandler = () => {};
  const commentHandler = () => {};

  return (
    <div className="full_post">
      <img className="full_post__img" src={imgUrl} />
      <div className="full_post__ditails">
        <a className="header" onClick={userClickHandler}>
          <img className="profile_img" src={props.postDetails.user.image_url}></img>
          <p className="username">{props.postDetails.user.nickname}</p>
        </a>
        <div className="bottom">
          <div className="bottom__header">
            <IconBtn onClick={likeHandler} icon={like ? IoHeart : IoHeartOutline} className="like_btn transparent"></IconBtn>
            <Link className="view_comments">View all {props.postDetails.post.users_like.length} comments</Link>
          </div>
          <div className="bottom__text">{props.postDetails.post.text}</div>
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
