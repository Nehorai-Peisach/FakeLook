import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Hr } from '../UiKIt';
import { storage } from 'firebases';

const SearchBar = (props) => {
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(async () => {
    if (props.list && props.list.length > 0) {
      // const urls = [];
      // for (let i = 0; i < props.list.length; i++) {
      //   const x = props.list[i];
      //   urls.push(await storage.ref('images/' + x.image_id).getDownloadURL());
      // }
      // console.log(storage.ref.downloadUrl());
      setList(() => {
        const tmpList = props.list.map((user, index) => (
          <div className="searchbar__input__item" key={'searchItem' + index} onMouseDown={() => userClicked(user._id)}>
            <img className="searchbar__input__item__img" src={user.image_url} />
            {user.nickname}
          </div>
        ));
        return [<Hr key={'searchItemLine'} />, ...tmpList];
      });
    }
  }, [props.list]);

  const userClicked = (id) => {
    setSearchValue('');
    props.onClick(id);
  };

  useEffect(() => {
    if (searchValue.length > 0) props.search(searchValue);
    setList([]);
  }, [searchValue]);

  return (
    <div className={'searchbar ' + props.className}>
      <IoSearchOutline className="searchbar__icon" />
      <input className="searchbar__input" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
      <div className={'searchbar__input__list'}>{list}</div>
    </div>
  );
};

export default SearchBar;
