import './search.scss';
import { ReactComponent as SearchIcon } from 'shared/assets/svg/bootstrap-icons-1.11.2/search.svg';
import { openSearch } from 'features/search/model/searchSlice';
import { useDispatch } from 'react-redux';
import { useHotkey } from 'shared/lib/hooks/useHotkey/useHotkey';

export const Search = () => {
  const dispatch = useDispatch();
  useHotkey(['Control', 'K'], () => {
    dispatch(openSearch());
  });
  return (
    <div className="nav-search">
      <button
        className="nav-search__btn button button-secondary button-auto button-size-m nav-search__btn"
        type="button"
        onClick={() => dispatch(openSearch())}
      >
        <span>Поиск</span>
        <kbd>Ctrl+k</kbd>
        <SearchIcon />
      </button>
    </div>
  );
};
