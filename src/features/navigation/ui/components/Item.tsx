import Link from 'next/link';

type Props = {
  label: string;
  link: string;
};

export const Item = ({ label, link }: Props) => {
  const normalizedLink = link.startsWith('/') ? link : `/${link}`;
  return (
    <li>
      <Link href={normalizedLink} className="navigation__link">
        {label}
      </Link>
    </li>
  );
};
