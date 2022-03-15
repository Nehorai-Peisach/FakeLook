const Title = (props) => {
  let className = '';
  if (props.className) className = props.className;
  return <span className={className + ' title'}>{props.children}</span>;
};

export default Title;
