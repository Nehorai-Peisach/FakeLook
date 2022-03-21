import { Container, Hr, Btn, Input, Link, Title, IconBtn } from 'components/uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';
import { useState } from 'react';
import loginService from 'services/authServices/signUpService';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [check, setCheck] = useState('');
  let samePassword = false;
  const checkPassword = (input) => {
    if (input === password) {
      samePassword = true;
      setCheck('');
    } else {
      samePassword = false;
      setCheck('input__error');
    }
  };

  const onLoginHandler = async () => {
    loginService(name, email, password);
  };

  return (
    <section className="login__page">
      <Container className="login__container">
        <Title className="login__title">Sign Up</Title>
        <Input
          validation={true}
          type="name"
          onChange={(value) => {
            setName(value);
          }}
        >
          Full Name...
        </Input>
        <Input
          validation={true}
          type="email"
          onChange={(value) => {
            setEmail(value);
          }}
        >
          Email...
        </Input>
        <Input
          validation={true}
          strength={true}
          type="password"
          onChange={(value) => {
            setPassword(value);
          }}
        >
          Password...
        </Input>
        <Input
          validation={true}
          className={check}
          type="password"
          onChange={(value) => {
            checkPassword(value);
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
