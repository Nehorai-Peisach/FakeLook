import { Btn, Hr, IconBtn, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AiOutlineEdit, AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import addFriendService from 'services/profileServices/addFriendService';
import removeFriendService from 'services/profileServices/removeFriendService';
import updateProfileService from 'services/profileServices/updateProfileService';
import { storage } from 'firebases';

const Profile = (props) => {
  const [cookies, setCookies] = useCookies(['user']);
  const [index, setIndex] = useState(0);
  const addFriend = async () => {
    await addFriendService(cookies.user.data._id, props.input._id);
    await updateProfileService(cookies.user.data._id, setCookies);
    setIndex(2);
  };
  const removeFriend = async () => {
    console.log(cookies.user.data._id);
    console.log(props.input._id);
    await removeFriendService(cookies.user.data._id, props.input._id);
    await updateProfileService(cookies.user.data._id, setCookies);
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
  const [likes, setLikes] = useState();
  const [urls, setUrls] = useState();
  useEffect(async () => {
    if (props.input) {
      if (props.input._id === cookies.user.data._id) setIndex(0);
      else cookies.user.data.friends_id && cookies.user.data.friends_id.includes(props.input._id) ? setIndex(2) : setIndex(1);

      const arr = [];
      for (let i = 0; i < props.input.posts_id.length; i++) {
        const id = props.input.posts_id[i];
        const url = await storage.ref(`images/${id}`).getDownloadURL();
        arr.push(url);
      }

      setUrls(arr);
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
          <Btn className="posts transparent">Posts: {props.input.posts_id.length}</Btn>
        </div>
      </div>
      <Hr />
      {urls ? (
        <div className="profile__galery">
          {urls.map((url) => (
            <img src={url} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;
