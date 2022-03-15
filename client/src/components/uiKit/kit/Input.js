const Input = (props) => {
  return (
    <label className={'input__wapper ' + props.className}>
      <div className="input__text">{props.text}</div>
      <input className="input__input" type={props.type} placeholder={props.children}></input>
    </label>
  );
};

export default Input;
