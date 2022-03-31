import GoogleLogin from 'react-google-login';
import Alerter from 'services/alertService/Alerter';
import { googleSignInService } from 'services/authServices/signInService';
import { googleSignUpService } from 'services/authServices/signUpService';

const LoginGoogle = (props) => {
  const connectGoogle = async (response) => {
    // console.log(response.profileObj);
    const isRegistered = await googleSignUpService(response.profileObj.name, response.profileObj.email, response.profileObj.googleId);
    if (isRegistered) {
      const isLogin = await googleSignInService(response.profileObj.googleId);
      if (isLogin) window.location.href = '/app';
      else Alerter("Can't connect to that Google Account!");
    } else Alerter("Can't connect to that Google Account!");
  };

  const notConnectGoogle = (err) => {
    Alerter("Can't connect to that Google Account!");
  };

  return (
    <GoogleLogin
      clientId="841577799854-bfv38hpa452vnccsd5387aoro0lvoadr.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={connectGoogle}
      onFailure={notConnectGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default LoginGoogle;
