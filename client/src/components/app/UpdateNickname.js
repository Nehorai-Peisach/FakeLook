import { Btn, Input } from 'components/uiKit/UiKIt';
import { useState } from 'react';
import Alerter from 'services/alertService/Alerter';

const UpdateNickname = (props) => {
  const [nickname, setNickname] = useState('');
  const onClick = () => {
    if (nickname.length > 2) props.enterNickname(nickname);
    else Alerter('Nickname must be more than 2 letters');
  };
  return (
    <div className="login__page">
      <Input className="nickname" onChange={setNickname} text="How your friends will see you?">
        Nickname...
      </Input>
      <Btn onClick={onClick}>Enter</Btn>
    </div>
  );
};

export default UpdateNickname;
