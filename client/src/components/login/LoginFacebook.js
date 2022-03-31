import { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import Alerter from 'services/alertService/Alerter';
import { facebookSignInService } from 'services/authServices/signInService';
import { facebookSignUpService } from 'services/authServices/signUpService';

const LoginFacebook = (props) => {
  const responseFacebook = async (response) => {
    await console.log(response);
    const isRegistered = await facebookSignUpService(response.name, response.email, response.id);
    if (isRegistered) {
      const isLogin = await facebookSignInService(response.id);
      if (isLogin) window.location.href = '/app';
      else Alerter("Can't connect to that Facebook Account!");
    } else Alerter("Can't connect to that Facebook Account!");
  };
  return <FacebookLogin appId="975609379995387" autoLoad={false} fields="name,email,picture" callback={responseFacebook} />;
};

export default LoginFacebook;
