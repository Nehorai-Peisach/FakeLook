import { IoSearchOutline } from 'react-icons/io5';

const SearchBar = (props) => {
  return (
    <label className={'searchbar ' + props.className}>
      <IoSearchOutline className="searchbar__icon" />
      <input className="searchbar__input" placeholder="Search..."></input>
    </label>
  );
};

export default SearchBar;
