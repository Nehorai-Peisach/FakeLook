import { IconBtn, Input } from 'components/uiKit/UiKIt';
import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';

const Post = () => {
  return (
    <div className="post">
      <div className="header">
        <img
          className="profile_img"
          src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
        ></img>
        <p className="username">demo</p>
      </div>
      <div className="img">
        <img src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg"></img>
      </div>
      <div className="bottom">
        <IconBtn icon={IoHeartOutline} className="like_btn"></IconBtn>
        <div className="comment_container">
          <Input className="comment_input" type="text" />
          <IconBtn className="comment_btn"></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default Post;
