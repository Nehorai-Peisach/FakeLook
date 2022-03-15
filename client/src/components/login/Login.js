import Btn from '../uiKit/Btn';
import FacebookLogin from '../uiKit/FacebookLogin';
import GoogleLogin from '../uiKit/GoogleLogin';
import Input from '../uiKit/Input';
import Link from '../uiKit/Link';
import SearchBar from '../uiKit/SearchBar';
import Title from '../uiKit/Title';

const Login = (props) => {
  return (
    <section className="login_page">
      <Title>Login</Title>
      <Input type="text">Username...</Input>
      <Input type="password">Password...</Input>
      <Btn>Login</Btn>
      <Link>forgot password?</Link>
      <div>
        Not yet a member?
        <Link>Sign up</Link>
      </div>
      <GoogleLogin />
      <FacebookLogin />
      <SearchBar></SearchBar>
    </section>
  );
};

export default Login;
