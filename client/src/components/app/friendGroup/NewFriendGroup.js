import Title, { Input, SearchBar } from 'components/uiKit/UiKIt';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import searchServices from 'services/searchServices/searchServices';

const NewFriendGroup = () => {
  const [cookies] = useCookies(['user']);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchHandler = async (value) => {
    const res = await searchServices(value, cookies.user.data._id);
    const friends = res.data.filter((x) =>
      cookies.user.data.friends_id.includes(x._id)
    );
    setSearchedUsers(friends);
  };
  return (
    <div>
      <Title>New Friend Group</Title>
      <div>
        <div>
          <span>Group Name</span>
          <Input>Enter group name...</Input>
        </div>
        <div>
          <span>Friends</span>
          <div className="fg__search__input">
            <SearchBar list={searchedUsers} search={searchHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFriendGroup;
