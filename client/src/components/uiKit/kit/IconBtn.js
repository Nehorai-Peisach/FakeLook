import { MdAccountCircle } from 'react-icons/md';
const IconBtn = (props) => {
  let className = '';
  let Icon = MdAccountCircle;
  if (props.className) className = props.className;
  if (props.icon) Icon = props.icon;

  return (
    <div className={className + ' icon_btn btn'} onClick={props.onClick}>
      <Icon className="icon" />
      <span className="text">{props.children}</span>
    </div>
  );
};

export default IconBtn;
