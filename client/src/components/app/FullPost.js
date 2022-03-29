import { RiSendPlaneFill } from 'react-icons/ri';
import { Hr, IconBtn, Input, Link, Loading } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useCookies } from 'react-cookie';
import getComments from 'services/postServices/getComments';
import Comment from './feed/Comment';
import likeService from 'services/postServices/likeService';
import commentService from 'services/postServices/commentService';

const FullPost = (props) => {
  const [cookies] = useCookies(['user']);
  const [like, setLike] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();

  const likeHandler = async () => {
    await likeService({ user_id: cookies.user.data._id, post_id: props.postDetails.post._id }, props.postDetails.user._id, props.socket);
    if (props.likeHandler) props.likeHandler(!like, props.postDetails.post._id);
    await setLike(!like);
  };

  const commentHandler = () => {
    if (comment !== '') {
      const newComment = {
        text: comment,
        user_id: cookies.user.data._id,
        post_id: props.postDetails.post._id,
      };
      commentService(newComment, cookies.user.data._id, props.socket);

      const tmp = {
        comment: newComment,
        nickname: cookies.user.data.nickname,
        image_url: cookies.user.data.image_url,
      };
      setComments((prevState) => [...prevState, tmp]);

      if (props.setComments) props.setComments((prevState) => [...prevState, 1]);
    }
  };

  const userClicked = () => {
    props.userClicked(props.postDetails.user._id);
    props.openClosePopup[1]();
  };

  useEffect(async () => {
    if (props.isLike !== undefined) setLike(props.isLike);
    else {
      let isLiked = props.postDetails.post.users_like.includes(cookies.user.data._id);
      if (isLiked) setLike(true);
      else setLike(false);
    }

    if (!comments) {
      const commList = await getComments(props.postDetails.post._id);
      setComments(commList);
    }
  }, []);

  useEffect(async () => {
    const url = await storage.ref(`images/${props.postDetails.post.image_id}`).getDownloadURL();
    setImgUrl(url);
  }, [props.post]);

  return (
    <div className="full_post">
      <div className="full_post__img_container">
        {imgUrl ? <img className="full_post__img_container__img" src={imgUrl} /> : <Loading className="full_post__img_container__img" />}
      </div>
      <div className="full_post__ditails">
        <a className="header" onClick={userClicked}>
          <img className="profile_img" src={props.postDetails.user.image_url}></img>
          <p className="username">{props.postDetails.user.nickname}</p>
        </a>
        <Hr />
        {comments ? <div className="comments_container">{comments && comments.map((c) => <Comment commentDetail={c} />)}</div> : <Loading />}
        <div className="bottom">
          <Hr />
          <div className="bottom__header">
            <IconBtn onClick={() => likeHandler()} icon={like ? IoHeart : IoHeartOutline} className="like_btn transparent"></IconBtn>
            <div className="bottom__header__text">{props.postDetails.post.text}</div>
          </div>
          <div className="comment_container">
            <Input className="comment_input" type="text" onChange={(value) => setComment(value)}>
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
