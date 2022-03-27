const Hr = (props) => {
  let className = '';
  if (props.className) className = props.className;
  return <hr className={className + ' hr'} />;
};

export default Hr;
