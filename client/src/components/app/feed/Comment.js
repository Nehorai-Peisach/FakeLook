const Comment = (props) => {
  let className = '';
  if (props.className) className = props.className;
  return (
    <div className={'comment ' + className}>
      <div className="comment__bg" onClick={() => props.commentClick()}></div>
      <img className="comment__img" src={props.commentDetail.image_url} />
      <div className="comment__container">
        <span className="comment__container__nickname" onClick={() => props.nicknameClick()}>
          {props.commentDetail.nickname}
        </span>
        <p className="comment__container__text">{props.commentDetail.comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
