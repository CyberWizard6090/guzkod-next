import React from 'react';
import { useMatches } from 'react-router-dom';
import { ReactComponent as Icon } from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-right.svg';
import './styles.scss';

interface MatchWithCrumb {
  pathname: string;
  handle?: {
    crumb?: React.ReactNode;
  };
}

export const Breadcrumbs = () => {
  const rawMatches = useMatches();
  const matches = rawMatches as MatchWithCrumb[];

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match, index) => {
      const isLast = index === matches.length - 1;

      return (
        <li key={match.pathname} className="breadcrumbs__item">
          {!isLast ? (
            <>
              {match.handle!.crumb}
              <span className="breadcrumbs__separator">
                <Icon />
              </span>
            </>
          ) : (
            <span className="breadcrumbs__current">{match.handle!.crumb}</span>
          )}
        </li>
      );
    });

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">{crumbs}</ul>
    </nav>
  );
};
