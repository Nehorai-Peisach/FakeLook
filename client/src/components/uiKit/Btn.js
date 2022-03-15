const Btn = (props) => {
  return (
    <span className={'btn ' + props.className} onClick={props.onClick}>
      {props.children}
    </span>
  );
};

export default Btn;
