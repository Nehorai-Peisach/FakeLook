import { Btn, IconBtn } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import addFriendService from 'services/profileServices/addFriendService';
import removeFriendService from 'services/profileServices/removeFriendService';
import updateProfileService from 'services/profileServices/updateProfileService';

const Profile = (props) => {
  const [index, setIndex] = useState(0);
  const addFriend = async () => {
    await addFriendService(props.user._id, props.input._id);
    await updateProfileService(props.user._id, props.setUser);
    console.log('add');
    setIndex(2);
  };
  const removeFriend = async () => {
    await removeFriendService(props.user._id, props.input._id);
    await updateProfileService(props.user._id, props.setUser);
    console.log('remove');
    setIndex(1);
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
      else props.user.friends_id && props.user.friends_id.includes(props.input._id) ? setIndex(2) : setIndex(1);
    }
  }, [props.input]);

  return (
    <div className="profile">
      <div className="header">
        <img src={props.input.image_url} className="img" />
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
