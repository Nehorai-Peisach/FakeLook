import IconBtn from '../IconBtn';
import { IoCloseOutline } from 'react-icons/io5';

const FullPagePopup = (props) => {
  let className = '';
  if (props.className) className = props.className;
  return (
    <div className={'full_popup ' + className}>
      <div className="full_popup__bg" onClick={props.close}></div>
      <IconBtn icon={IoCloseOutline} className="transparent white_text" onClick={props.close} />
      <div className="full_popup__content">{props.popup}</div>
    </div>
  );
};

export default FullPagePopup;
