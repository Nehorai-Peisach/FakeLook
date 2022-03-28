const Link = (props) => {
  let className = '';
  if (props.className) className = props.className;

  const ClickHandler = (e) => {
    e.preventDefault();
    if (props.onClick) props.onClick();
  };

  return (
    <a className={className + ' link'} href={props.to} onClick={ClickHandler}>
      {props.children}
    </a>
  );
};

export default Link;
