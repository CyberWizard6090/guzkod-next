import './nav.scss';

import { useState, useEffect } from 'react';
import { elements } from '../config/elements';
import { Item } from './Item';
import { Tree } from './Tree';
import { NavMobile } from './navMobile';
import { useLocation } from 'react-router-dom';
export const Nav = () => {
  const url = '/api/globals/nav?locale=undefined&draft=false&depth=0';
  const [layout, setPageData] = useState([]);
  const [state, setState] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setState(false);
  }, [location.pathname]);
  useEffect(() => {
    fetch(url, {
      // mode: 'no-cors',
      // // method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        setPageData(data.layout);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const toggleState = () => {
    setState(!state);
  };

  return (
    <>
      <NavMobile toggleState={toggleState} state={state} />
      <aside className={`nav  ${state ? 'nav--active' : ''} `}>
        <nav className="nav__container">
          <ul className="nav__list-item">
            <Item label={'Главная'} link={'/'} />
            <Item label={'Отзыв'} link={'/feedback'} />
            <Item label={'Новости и профилактика'} link={'/article'} />
            <Tree label={'Персонал и отделения'} list={undefined}>
              <Item label={'Персонал'} link={'/personnel'} />
              <Item label={'Отделения'} link={'/departments'} />
            </Tree>
            {layout &&
              layout?.map((block: { blockType: string }, index) => {
                const Block = elements[block.blockType];

                if (Block) {
                  return <Block key={index} {...block} />;
                }
                return null;
              })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
