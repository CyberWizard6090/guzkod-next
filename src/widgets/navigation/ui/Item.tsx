import { Link } from 'react-router-dom';

type Props = {
  label: string;
  link: string;
};

export const Item = ({ label, link }: Props) => {
  return (
    <li>
      <Link
        to={link}
        className="navigation__link"
        //   onClick={() => isMobile && setMobileMenuVisible(false)}
      >
        {label}
      </Link>
    </li>
  );
};
