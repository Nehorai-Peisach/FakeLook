const Nofification = (props) => {
  let className = '';
  if (props.className) className = props.className;

  return (
    <div className={'notify_message ' + className}>
      <img className="notify_message__profile" src={props.detail.profile_url} />
      <img className="notify_message__img" src={props.detail.image_url} />
      <span className="notify_message__bg" onClick={() => props.bgClick(props.detail.user_id, props.detail._id)}></span>
      <div className="notify_message__container">
        <span className="notify_message__container__nickname" onClick={() => props.nicknameClick(props.detail.user_id, props.detail._id)}>
          {props.detail.nickname}
        </span>
        <p className="notify_message__container__text">{props.detail.comment.text}</p>
      </div>
    </div>
  );
};

export default Nofification;
