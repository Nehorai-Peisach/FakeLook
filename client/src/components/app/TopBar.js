import { IconBtn, SearchBar } from 'components/uiKit/UiKIt';
import {
  IoPersonOutline,
  IoAddCircleOutline,
  IoImagesOutline,
  IoLocationOutline,
  IoNotificationsOutline
} from 'react-icons/io5';
import Alerter from 'services/alertService/Alerter';

const TopBar = (props) => {
  let classes = ['', '', '', ''];
  for (let i = 0; i < classes.length; i++) {
    props.current === i
      ? (classes[i] = 'top_btn_color active')
      : (classes[i] = 'top_btn_color');
  }
  const alert = () => {
    Alerter('No New Messages!');
  };
  return (
    <div className="top_bar">
      <IconBtn icon={IoNotificationsOutline} className="notification top_btn_color" click={alert} />
      <SearchBar />
      <div className="pages_btns">
        <IconBtn
          icon={IoImagesOutline}
          className={classes[0]}
          onClick={() => props.to(0)}
        />
        <IconBtn
          icon={IoLocationOutline}
          className={classes[1]}
          onClick={() => props.to(1)}
        />
        <IconBtn
          icon={IoAddCircleOutline}
          className={classes[2]}
          onClick={() => {
            props.to(2);
            console.log('hey');
          }}
        />
        <IconBtn
          icon={IoPersonOutline}
          className={classes[3]}
          onClick={() => props.to(3)}
        />
      </div>
    </div>
  );
};

export default TopBar;