import React, { useEffect, useState } from 'react';
import './footer.scss';

interface Link {
  text: string;
  href: string;
  id: string;
}

interface Column {
  title: string;
  List: Link[];
  id: string;
}

interface FooterData {
  List: Column[];
}

export const Footer = () => {
  const url = '/api/globals/footer?locale=undefined&draft=false&depth=0';
  const [pageData, setPageData] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        return response.json();
      })
      .then((data: FooterData) => {
        setPageData(data.List || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading footer...</div>;
  }

  if (error) {
    return <div>Error loading footer: {error}</div>;
  }

  if (pageData.length === 0) {
    return <div>No footer data available</div>;
  }

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
