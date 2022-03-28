import { RiSendPlaneFill } from 'react-icons/ri';
import { Hr, IconBtn, Input, Link, Loading } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useCookies } from 'react-cookie';
import Comment from './Comment';
import getComments from 'services/postServices/getComments';

const FullPost = (props) => {
  const [showFullPopup, closeFullPopup] = props.openClosePopup;
  const [like, setLike] = useState(props.isLike);
  const [imgUrl, setImgUrl] = useState();
  const [cookies] = useCookies(['user']);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();

  useEffect(async () => {
    if (!comments) {
      const commList = await getComments(props.postDetails.post._id);
      console.log(commList);
      setComments(commList);
    }
  }, []);

  useEffect(async () => {
    const url = await storage
      .ref(`images/${props.postDetails.post.image_id}`)
      .getDownloadURL();
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
    if (comment !== '') {
      const newComment = {
        text: comment,
        user_id: cookies.user.data._id,
        post_id: props.postDetails.post._id
      };
      props.commentHandler(newComment, props.postDetails.user._id);

      const tmp = {
        comment: newComment,
        nickname: cookies.user.data.nickname,
        image_url: cookies.user.data.image_url
      };
      props.setComments((prevState) => [...prevState, 1]);
      setComments((prevState) => [...prevState, tmp]);
    }
  };

  return (
    <div className="full_post">
      <div className="full_post__img_container">
        {imgUrl ? (
          <img className="full_post__img_container__img" src={imgUrl} />
        ) : (
          <Loading />
        )}
      </div>
      <div className="full_post__ditails">
        <a className="header" onClick={userClickHandler}>
          <img
            className="profile_img"
            src={props.postDetails.user.image_url}
          ></img>
          <p className="username">{props.postDetails.user.nickname}</p>
          <Hr />
        </a>
        <div className="comments_container">
          {comments && comments.map((c) => <Comment commentDetail={c} />)}
        </div>
        <div className="bottom">
          <Hr />
          <div className="bottom__header">
            <IconBtn
              onClick={likeHandler}
              icon={like ? IoHeart : IoHeartOutline}
              className="like_btn transparent"
            ></IconBtn>
            <div className="bottom__header__text">
              {props.postDetails.post.text}
            </div>
          </div>
          <div className="comment_container">
            <Input
              className="comment_input"
              type="text"
              onChange={(value) => setComment(value)}
            >
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
    </div>
  );
};

export default FullPost;
