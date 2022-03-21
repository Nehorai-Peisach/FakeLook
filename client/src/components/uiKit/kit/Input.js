import { InputValitation, PasswordStrength } from 'services/Valitations';
import { useState, useRef, useEffect } from 'react';

const Input = (props) => {
  const passwordRef = useRef(null);
  const [value, setValue] = useState();

  let propsClassName = '';
  if (props.className) propsClassName = props.className;
  const [className, setClassName] = useState('');

  const onChange = (value) => {
    setValue(value);
    props.onChange(value);

    if (props.validation) {
      if (InputValitation(value)) {
        setClassName('');
      } else setClassName('input__error');
    }
    
    if (passwordRef.current && props.strength) {
      PasswordStrength(passwordRef.current, value);
    }
  };

  return (
    <label className={'input__wapper ' + className + ' ' + propsClassName}>
      <div className="input__text">{props.text}</div>
      <input className="input__input" type={props.type} placeholder={props.children} onChange={(e) => onChange(e.target.value)}></input>
      <div ref={passwordRef}></div>
    </label>
  );
};

export default Input;
