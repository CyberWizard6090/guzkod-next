import Link from 'next/link';

type Props = {
  label: string;
  link: string;
};

export const Item = ({ label, link }: Props) => {
  return (
    <li>
      <Link
        href={link}
        className="navigation__link"
        //   onClick={() => isMobile && setMobileMenuVisible(false)}
      >
        {label}
      </Link>
    </li>
  );
};
