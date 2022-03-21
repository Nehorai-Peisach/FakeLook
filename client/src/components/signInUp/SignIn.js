import { Container, Hr, Btn, Input, Link, Title, IconBtn } from 'components/uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';
import { useState } from 'react';
import signInService from 'services/authServices/signInService';
import { InputValitation } from 'services/Valitations';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = async () => {
    InputValitation.check(username);
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
        <Btn onClick={onLoginHandler}>Sign in</Btn>
        <div className="login__links">
          <Link to="#">Forgot password</Link>
          <Link to="/sign-up">Create Account</Link>
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
