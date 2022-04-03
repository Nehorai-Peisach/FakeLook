import { Btn, Hr, IconBtn, Loading } from 'components/uiKit/UiKIt';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  AiOutlineEdit,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineStop,
  AiOutlineDelete
} from 'react-icons/ai';
import addFriendService from 'services/profileServices/addFriendService';
import removeFriendService from 'services/profileServices/removeFriendService';
import updateProfileService from 'services/profileServices/updateProfileService';
import { storage } from 'firebases';
import getPostsByUserId from 'services/postServices/getPostsByUserId';
import FullPost from '../FullPost';
import EditProfile from './EditProfile';
import YesNoPopup from 'components/uiKit/kit/layout/YesNoPopup';
import removePostByIdService from 'services/postServices/removePostByIdService';
import blockService from 'services/blockServices/blockService';
import unblockService from 'services/blockServices/unblockService';

const Profile = (props) => {
  const [cookies, setCookies] = useCookies(['user']);
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState(0);
  const [posts, setPosts] = useState();
  const [refresh, setRefresh] = useState();

  const [btnDisplay, setBtnDisplay] = useState('block');
  const [blockState, setBlockState] = useState('not blocked');

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

  const [edit, setEdit] = useState(false);
  const editProfile = () => {
    setEdit(true);
  };

  const deletePostHandler = (id) => {
    props.openClosePopup[0](
      <YesNoPopup onClickHandler={(answer) => deletePost(answer, id)} />
    );
  };

  const deletePost = async (isDel, id) => {
    if (isDel) {
      await removePostByIdService(id);
      await setRefresh(Math.random());
    }
    props.openClosePopup[1]();
  };
  const states = [
    { icon: AiOutlineEdit, color: 'grey', onClick: editProfile },
    { icon: AiOutlineUserAdd, color: 'green', onClick: addFriend },
    { icon: AiOutlineUserDelete, color: 'red', onClick: removeFriend }
  ];

  const likeHandler = (flag, postId) => {
    const post = posts.filter((x) => x._id === postId)[0];
    const tmp = post;

    if (flag) {
      setLikes((pre) => pre + 1);
      post.users_like.push(cookies.user.data._id);
    } else {
      setLikes((pre) => pre - 1);
      const index = post.users_like.indexOf(cookies.user.data._id);
      post.users_like.splice(index, 1);
    }

    setPosts((pre) => {
      const i = pre.indexOf(tmp);
      pre[i] = post;
      return pre;
    });
  };

  const postClickHandler = (post) => {
    const postDetails = { user: props.input, post: post };
    props.openClosePopup[0](
      <FullPost
        socket={props.socket}
        userClicked={props.userClicked}
        postDetails={postDetails}
        openClosePopup={props.openClosePopup}
        likeHandler={likeHandler}
      />
    );
  };

  useEffect(async () => {
    await setPosts([]);
    if (props.input) {
      if (props.input._id === cookies.user.data._id) setIndex(0);
      else
        cookies.user.data.friends_id &&
        cookies.user.data.friends_id.includes(props.input._id)
          ? setIndex(2)
          : setIndex(1);
      const arr = [];
      let likeCount = 0;
      const tmpPosts = await getPostsByUserId(props.input._id);
      for (let i = 0; i < tmpPosts.length; i++) {
        const post = tmpPosts[i];
        const url = await storage
          .ref(`images/${post.image_id}`)
          .getDownloadURL();
        arr.push({ ...post, image_url: url });
        likeCount += post.users_like.length;

        if (cookies.user.data.block_list.includes(props.input._id)) {
          setBtnDisplay('none');
        } else setBtnDisplay('block');
      }
      setPosts(arr);
      setLikes(likeCount);
    }
  }, [props.input, refresh, blockState]);

  const onBlockHandler = () => {
    if (blockState === 'not blocked') {
      setBlockState('blocked');
      props.openClosePopup[0](
        <div className="block_popup">
          <span className="block_popup__title">
            Are you sure you want to block?
          </span>
          <div className="block_popup__btns">
            <Btn className="block_popup__btns__block" onClick={blockUser}>
              Block
            </Btn>
            <Btn
              className="block_popup__btns__cansel"
              onClick={props.openClosePopup[1]}
            >
              Cancel
            </Btn>
          </div>
        </div>
      );
    } else {
      unblockUser();
    }
  };

  const blockUser = async () => {
    console.log(props.input._id);
    const result = await blockService(cookies.user.data._id, props.input._id);
    await updateProfileService(cookies.user.data._id, setCookies);
    if (result) {
      setBtnDisplay('none');
      props.openClosePopup[1]();
      setBlockState('bloked');
    }
  };

  const unblockUser = async () => {
    const result = await unblockService(cookies.user.data._id, props.input._id);
    await updateProfileService(cookies.user.data._id, setCookies);
    if (result) {
      setBtnDisplay('block');
      setBlockState('not blocked');
    }
  };

  return !edit ? (
    <div className="profile">
      <div className="header">
        <img src={props.input.image_url} className="img" />
        <div className="details">
          <h1 className="name">{props.input.nickname}</h1>
          <IconBtn
            style={{ display: btnDisplay }}
            icon={states[index].icon}
            className={states[index].color}
            onClick={() => states[index].onClick()}
          />
          {index !== 0 && (
            <IconBtn
              className="block_btn"
              icon={AiOutlineStop}
              onClick={onBlockHandler}
            ></IconBtn>
          )}
          <p className="bio">{props.input.bio}</p>
          <Btn className="friends transparent">
            Friends: {props.input.friends_id.length}
          </Btn>
          <Btn className="likes transparent">Likes: {likes}</Btn>
          <Btn className="posts transparent">
            Posts: {posts ? posts.length : 0}
          </Btn>
        </div>
      </div>
      <Hr />
      {posts ? (
        <div className="profile__galery">
          {posts.map((x, i) => {
            return (
              <div className="profile__galery__post">
                <img
                  key={'profilePosts' + i}
                  src={x.image_url}
                  onClick={() => postClickHandler(x)}
                ></img>
                <IconBtn
                  key={'deleteIcon ' + i}
                  icon={AiOutlineDelete}
                  className="profile__galery__post__delete_icon"
                  onClick={() => deletePostHandler(x.image_id)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  ) : (
    <EditProfile
      userClicked={props.userClicked}
      user={props.input}
      setCookies={setCookies}
      save={() => setEdit(null)}
    />
  );
};

export default Profile;
