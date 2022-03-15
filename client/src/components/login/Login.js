import { Container, Hr, Btn, Input, Link, Title, IconBtn } from '../uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';

const Login = (props) => {
  return (
    <section className="login__page">
      <Container className="login__container">
        <Title className="login__title">Sign In</Title>
        <Input type="text">Username...</Input>
        <Input type="password">Password...</Input>
        <Btn>Login</Btn>
        <div className="login__links">
          <Link to="#">Forgot password?</Link>
          <Link to="#">Create Account</Link>
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

export default Login;
