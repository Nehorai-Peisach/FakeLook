import Alerter from 'services/alertService/Alerter';

const EmailValidation = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  Alerter('You have entered an invalid email address!');
  return false;
};

export default EmailValidation;
