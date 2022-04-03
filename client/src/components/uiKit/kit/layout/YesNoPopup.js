import IconBtn from '../IconBtn';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
const YesNoPopup = (props) => {
  let text = 'Are you sure?';
  if (props.text) text = props.text;
  return (
    <div className="yes_no_popup">
      <span>{text}</span>
      <div>
        <IconBtn className="yes" icon={AiOutlineCheck} onClick={() => props.onClickHandler(true)} />
        <IconBtn className="no" icon={AiOutlineClose} onClick={() => props.onClickHandler(false)} />
      </div>
    </div>
  );
};

export default YesNoPopup;
