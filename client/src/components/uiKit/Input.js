const Input = (props) => {
  return (
    <div className={'input__wapper ' + props.className}>
      <div className="input__text">{props.text}</div>
      <input className="input__input" type={props.type} placeholder={props.children}></input>
    </div>
  );
};

export default Input;
