import React, { useEffect, useState } from 'react';

import './articlePage.scss';
import { CardRead } from 'entities/CardRead';
import { Article } from 'shared/types/article';

export const ArticlePage = () => {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    fetch('/api/article')
      .then((response) => response.json())
      .then((data) => {
        setPageData(data.docs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="Page-Article animation-reveal">
      {pageData.map((item: Article, index) => (
        <CardRead key={index} article={item} />
      ))}
    </div>
  );
};
