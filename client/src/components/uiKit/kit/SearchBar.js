import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Hr } from '../UiKIt';

const SearchBar = (props) => {
  let className = '';
  if (props.className) className = props.className;
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(async () => {
    if (props.list && props.list.length > 0) {
      setList(() => {
        const tmpList = props.list.map((user, index) => (
          <div
            className="searchbar__input__item"
            key={'searchItem' + index}
            onMouseDown={() => userClicked(user._id, user.nickname)}
          >
            <img className="searchbar__input__item__img" src={user.image_url} />
            {user.nickname}
          </div>
        ));
        return [<Hr key={'searchItemLine'} />, ...tmpList];
      });
    }
  }, [props.list]);

  const userClicked = (id, nickname) => {
    setSearchValue('');
    props.onClick(id, nickname);
  };

  useEffect(() => {
    if (searchValue.length > 0) props.search(searchValue);
    setList([]);
  }, [searchValue]);

  return (
    <div className={'searchbar ' + className}>
      <IoSearchOutline className="searchbar__icon" />
      <input
        className="searchbar__input"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <div className={'searchbar__input__list'}>{list}</div>
    </div>
  );
};

export default SearchBar;
