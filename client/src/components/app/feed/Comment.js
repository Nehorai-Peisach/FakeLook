const Comment = (props) => {
  return (
    <div className="comment">
      <img className="comment__img" src={props.commentDetail.image_url} />
      <span className="comment__nickname">{props.commentDetail.nickname}</span>
      <p className="comment__text">{props.commentDetail.comment.text}</p>
    </div>
  );
};

export default Comment;
