const Btn = (props) => {
  const onClick = (e) => {
    e.preventDefault();
    props.onClick && props.onClick();
  };
  let className = '';
  if (props.className) className = props.className;
  return (
    <button type={!props.type && 'button'} className={className + ' btn'} onClick={(e) => onClick(e)}>
      {props.children}
    </button>
  );
};

export default Btn;
