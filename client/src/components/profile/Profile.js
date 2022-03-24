import { Btn, IconBtn } from 'components/uiKit/UiKIt';
import React from 'react';
import { AiOutlineEdit, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

const Profile = (props) => {
  const img = 'https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png';
  const bio = "Hey there I'm using FakeLook!.";
  const user = !props.user && {};
  let index = 0;
  const states = [
    { icon: AiOutlineEdit, color: 'grey' },
    { icon: AiOutlineUserAdd, color: 'green' },
    { icon: AiOutlineUserDelete, color: 'red' },
  ];
  if (props.profile && props.user) {
    user.friends_id.includes(props.profile._id) ? (index = 2) : (index = 1);
  }

  return (
    <div className="profile">
      <div className="header">
        <img src={!user.image && img} className="img" />
        <div className="details">
          <h1 className="name">{!user.name && 'Name'}</h1>
          <IconBtn icon={states[index].icon} className={states[index].color} />
          <p className="bio">{!user.bio && bio}</p>
          <Btn className="friends transparent">Friends: {!(user.freinds_id && user.freinds_id.length) && 0}</Btn>
          <Btn className="likes transparent">Likes: {!(user.freinds_id && user.freinds_id.length) && 0}</Btn>
          <Btn className="posts transparent">Posts: {!(user.posts && user.posts.length) && 0}</Btn>
        </div>
      </div>
    </div>
  );
};

export default Profile;
