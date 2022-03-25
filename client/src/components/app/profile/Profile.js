import { Btn, IconBtn } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

const defaultImg =
  'https://firebasestorage.googleapis.com/v0/b/fakelook-storage.appspot.com/o/images%2F467c912f-4ce6-47c7-a51d-245c1b3fa9c5.png?alt=media&token=8e282a32-3bf7-4fab-922d-0699da427ed4';
const Profile = (props) => {
  const [index, setIndex] = useState(0);
  const addFriend = () => {
    console.log('add');
  };
  const removeFriend = () => {
    console.log('remove');
  };
  const editProfile = () => {
    console.log('edit');
  };
  const states = [
    { icon: AiOutlineEdit, color: 'grey', onClick: editProfile },
    { icon: AiOutlineUserAdd, color: 'green', onClick: addFriend },
    { icon: AiOutlineUserDelete, color: 'red', onClick: removeFriend },
  ];

  useEffect(() => {
    if (props.input && props.user) {
      if (props.input._id === props.user._id) setIndex(0);
      else props.user.friends_id.find((x) => x._id === props.input._id) ? setIndex(2) : setIndex(1);
    }
  }, [props.input]);

  return (
    <div className="profile">
      <div className="header">
        {/* <img src={props.input.image_id} className="img" /> */}
        <img src={defaultImg} className="img" />
        <div className="details">
          <h1 className="name">{props.input.nickname}</h1>
          <IconBtn icon={states[index].icon} className={states[index].color} onClick={() => states[index].onClick()} />
          <p className="bio">{props.input.bio}</p>
          <Btn className="friends transparent">Friends: {props.input.friends_id.length}</Btn>
          <Btn className="likes transparent">Likes: {props.input.friends_id.length}</Btn>
          <Btn className="posts transparent">Posts: {props.input.posts.length}</Btn>
        </div>
      </div>
    </div>
  );
};

export default Profile;
