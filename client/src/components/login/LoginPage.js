import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginPage = (props) => {
  const [index, setIndex] = useState(0);
  const pages = [<SignIn setUser={props.setUser} setIndex={setIndex} />, <SignUp setIndex={setIndex} />];

  return <div className="login__page">{pages[index]}</div>;
};

export default LoginPage;
