import { RootState } from 'app/stores';

import { useDispatch, useSelector } from 'react-redux';
import { closeSearch } from '../model/searchSlice';
import './searchModal.scss';
import { Block } from 'shared/ui/block';
import { useHotkey } from 'shared/lib/hooks/useHotkey/useHotkey';
import { VoiceInput } from 'shared/ui/input';

export const SearchModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.search);

  // const [query, setQuery] = useState('');

  const popularQueries = ['тест', 'тест', 'тест', 'тест', 'тест'];

  useHotkey(['Escape'], () => {
    dispatch(closeSearch());
  });
  if (!isOpen) return null;

  return (
    // <div className='search-modal' onClick={()=> dispatch(closeSearch())}>

    <div className="search-modal">
      <div className="modal">
        <Block>
          <div className="header">
            <VoiceInput />
          </div>

          <div className="tabs">
            <span className="active-tab">тест</span>
            <span>тест</span>
            <span>тест</span>
            <span>тест</span>
            <span>тест</span>
          </div>
          <div className="popular-queries">
            <h3>Популярные запросы</h3>
            <ul>
              {popularQueries.map((query, index) => (
                <li key={index} className="query-item">
                  {query}
                </li>
              ))}
            </ul>
          </div>
          <ul className="nav-search__nav">
            <li>
              <kbd>↵</kbd> Выбрать
            </li>
            <li>
              <kbd>↑↓</kbd> Навигация
            </li>
            <li>
              <kbd>ESC</kbd> Закрыть
            </li>
          </ul>
        </Block>
      </div>
    </div>
  );
};
