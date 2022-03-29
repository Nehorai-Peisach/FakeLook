import Title, { IconBtn, Input, SearchBar } from 'components/uiKit/UiKIt';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import searchServices from 'services/searchServices/searchServices';
import { FaUserFriends } from 'react-icons/fa';
import newGroupServices from 'services/groupServices/newGroupService';

const NewFriendGroup = () => {
  const [cookies] = useCookies(['user']);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [name, setName] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [noNameError, setNoNameError] = useState(<></>);
  const [noFriendsError, setNoFriendsError] = useState(<></>);
  const [resultMsg, setResultMsg] = useState(<></>);

  const searchHandler = async (value) => {
    const res = await searchServices(value, cookies.user.data._id);
    const friends = res.data.filter((x) =>
      cookies.user.data.friends_id.includes(x._id)
    );
    setSearchedUsers(friends);
  };

  function friendClick(id, nickname) {
    setNoFriendsError(<></>);
    setFriendsList((prev) => {
      if (prev.some((x) => x._id === id)) return prev;
      else return [...prev, { _id: id, nickname: nickname }];
    });
  }

  const removeUser = (friend) => {
    setFriendsList((prev) => {
      prev = prev.filter((x) => x._id !== friend._id);
      return prev;
    });
  };

  const createGroup = async () => {
    if (name === '')
      setNoNameError(
        <div className="error">Please enter your group name!</div>
      );
    if (friendsList.length === 0) {
      setNoFriendsError(
        <div className="error">Please select at least one friend!</div>
      );
    }
    if (name !== '' && friendsList.length > 0) {
      let newList = [];
      for (let i = 0; i < friendsList.length; i++) {
        const friend = friendsList[i];
        newList.push(friend._id);
      }
      const newGroup = {
        name: name,
        friends_id: newList
      };

      const result = await newGroupServices(cookies.user.data._id, newGroup);
      console.log(result);
      if (result) setResultMsg(<h1>Group Added!</h1>);
    }
  };

  return (
    <div className="fg">
      <Title className="fg__title">New Friend Group</Title>
      <div className="fg__container">
        <div className="fg__container__name">
          {noNameError}
          <span>Group Name</span>
          <Input
            onChange={(value) => {
              setNoNameError(<></>);
              setName(value);
            }}
          >
            Enter group name...
          </Input>
        </div>
        <div className="fg__container__friend-search">
          {noFriendsError}
          <span>Friends</span>
          <SearchBar
            className="fg__container__friend-search__input"
            list={searchedUsers}
            search={searchHandler}
            onClick={friendClick}
          />
        </div>
        <div className="fg__container__selected">
          {friendsList &&
            friendsList.map((f) => {
              console.log(friendsList);
              return (
                <div
                  className="fg__container__selected__item"
                  onClick={() => removeUser(f)}
                >
                  {f.nickname}
                </div>
              );
            })}
        </div>
        <IconBtn
          onClick={createGroup}
          className="fg__container__btn"
          icon={FaUserFriends}
        >
          Create Group
        </IconBtn>
      </div>
      {resultMsg}
    </div>
  );
};

export default NewFriendGroup;
