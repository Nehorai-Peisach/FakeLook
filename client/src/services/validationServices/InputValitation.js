import Alerter from 'services/alertService/Alerter';

const InputValitation = (input, name = 'input', flag = false) => {
  let isTrue = false;

  if (flag || (input && input.length > 0)) isTrue = true;
  return isTrue;
};

export default InputValitation;
