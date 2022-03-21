import { Container, Hr, Btn, Input, Link, Title, IconBtn } from 'components/uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';
import { useState } from 'react';
import signInService from 'services/signInService';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = async () => {
    const result = await signInService(username, password);
    if (result) {
      console.log('user connected:' + result.data.username);
    } else {
      console.log('user not found');
    }
  };

  return (
    <section className="login__page">
      <Container className="login__container">
        <Title className="login__title">Sign In</Title>
        <Input
          type="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        >
          Username...
        </Input>
        <Input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          Password...
        </Input>
        <Btn onClick={onLoginHandler}>Sign in</Btn>
        <div className="login__links">
          <Link to="#">Forgot password</Link>
          <Link to="/signup">Create Account</Link>
        </div>
        <Hr />
        {/* <IconBtn icon={BsFacebook} className="blue">
          Login with Facebook
        </IconBtn> */}
        <LoginGoogle />
      </Container>
    </section>
  );
};

export default SignIn;
