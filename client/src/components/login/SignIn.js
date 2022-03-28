import { Hr, Btn, Input, Link, Title } from 'components/uiKit/UiKIt';
import LoginGoogle from './LoginGoogle';
import { useEffect, useState } from 'react';
import signInService from 'services/authServices/signInService';
import Alerter from 'services/alertService/Alerter';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnClass, setBtnClass] = useState('');
  useEffect(() => {
    if (username.length > 0 && password.length > 0) setBtnClass('');
    else setBtnClass('disable');
  }, [username, password]);

  const onLoginHandler = async () => {
    const result = await signInService(username, password);
    if (result) {
      console.log('user connected:' + result.data.username + 'id: ' + result.data._id);
      window.location.href = '/app';
    } else {
      Alerter('Username or Password is incorrect!');
    }
  };

  return (
    <form className="login__container">
      <Title className="login__title">Sign In</Title>
      <Input
        validation={true}
        type="username"
        onChange={(value) => {
          setUsername(value);
        }}
      >
        Username...
      </Input>
      <Input
        validation={true}
        type="password"
        onChange={(value) => {
          setPassword(value);
        }}
      >
        Password...
      </Input>
      <Btn type="submit" onClick={onLoginHandler} className={btnClass}>
        Sign in
      </Btn>
      <div className="login__links">
        <Link>Forgot password</Link>
        <Link onClick={() => props.setIndex(1)}>Create Account</Link>
      </div>
      <Hr />
      {/* <IconBtn icon={BsFacebook} className="blue">
          Login with Facebook
        </IconBtn> */}
      <LoginGoogle />
    </form>
  );
};

export default SignIn;
