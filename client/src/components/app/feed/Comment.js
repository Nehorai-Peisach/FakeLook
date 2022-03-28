const Comment = (props) => {
  return (
    <div className="comment">
      {/* props.comment.image_url */}
      <img className="comment__img" src={''} />
      {/* props.comment.nickname */}
      <span className="comment__nickname">Nickname</span>" "{/* props.comment.text */}
      <p className="comment__text">Text</p>
    </div>
  );
};

export default Comment;
