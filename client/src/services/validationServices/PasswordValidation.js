import Alerter from 'services/alertService/Alerter';

const PasswordValidation = (password) => {
  let hasChar = false;
  let hasNum = false;
  for (let i = 0; i < password.length; i++) {
    const x = password[i];
    if (!isNaN(x)) hasNum = true;
    if (isNaN(x)) hasChar = true;
    if (hasChar && hasNum) break;
  }

  let isAll = false;
  hasChar
    ? hasNum
      ? password.length > 4
        ? (isAll = true)
        : Alerter('Password must be longer than 4!')
      : Alerter('Password need to contain at least one Number!')
    : Alerter('Password need to contain at least one Letter!');

  return isAll;
};

export default PasswordValidation;
