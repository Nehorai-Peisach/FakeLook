const Btn = (props) => {
  let className = '';
  if (props.className) className = props.className;
  return (
    <div className={className + ' btn'} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Btn;
