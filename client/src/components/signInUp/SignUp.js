import { Container, Hr, Btn, Input, Link, Title, IconBtn } from 'components/uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';
import { useState } from 'react';
import loginService from 'services/signUpService';

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = async () => {
    loginService(username, password);
  };

  return (
    <section className="login__page">
      <Container className="login__container">
        <Title className="login__title">Sign Up</Title>
        <Input
          type="name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        >
          Full Name...
        </Input>
        <Input
          type="email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        >
          Email...
        </Input>
        <Input
          type="password"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        >
          Password...
        </Input>
        <Input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          Confirm Password...
        </Input>
        <Btn onClick={onLoginHandler}>Sign up</Btn>
        <Link to="/sign-in">Already have an account - sign in</Link>
        <Hr />
        <LoginGoogle />
      </Container>
    </section>
  );
};

export default SignUp;
