import { Btn } from 'components/uiKit/UiKIt';
import React from 'react';

const Profile = (props) => {
  const img = 'https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png';
  const bio = "Hey there I'm using FakeLook!.";
  const user = !props.user && {};

  return (
    <div className="profile">
      <div className="header">
        <img src={!user.image && img} className="img" />
        <div className="details">
          <h1 className="name">{!user.name && 'Name'}</h1>
          <Btn className="add_friend">Add as friend</Btn>
          <p className="bio">{!user.bio && bio}</p>
          <Btn className="friends">Friends: {!user.freinds && 0}</Btn>
          <Btn className="likes">Likes: {!user.freinds && 0}</Btn>
          <Btn className="posts">Posts: {!(user.posts && user.posts.length) && 0}</Btn>
        </div>
      </div>
    </div>
  );
};

export default Profile;
