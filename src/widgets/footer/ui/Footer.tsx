'use client';

import React, { useEffect, useState } from 'react';
import { FooterSkeleton } from './FooterSkeleton';
import { getFooterData } from 'shared/api/footer';
import './Footer.scss';

type Link = {
  text: string;
  href: string;
  id: string;
};

type Column = {
  title: string;
  List: Link[];
  id: string;
};

export const Footer = () => {
  const [pageData, setPageData] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFooterData()
      .then((data) => {
        setPageData(data.List ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <FooterSkeleton />;
  if (error || pageData.length === 0) return;

  return (
    <footer className="footer shadow__style">
      <div className="footer-container">
        {pageData.map((column) => (
          <div key={column.id} className="footer-column">
            <h4 className="footer-title">{column.title}</h4>
            <ul className="footer-links">
              {column.List.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="footer-link">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
