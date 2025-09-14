import Link from 'next/link';

type Props = {
  label: string;
  url: string;
};

export const Item = ({ label, url }: Props) => {
  return (
    <li>
      <Link href={url} className="navigation__link">
        {label}
      </Link>
    </li>
  );
};
