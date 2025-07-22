'use client';
import { Button } from 'shared/ui/button';
import IconSearch from 'shared/assets/svg/bootstrap-icons-1.11.2/search.svg';
import Link from 'next/link';

export const ButtonSearch = () => {
  return (
    <Link href="/search">
      <Button Icon={IconSearch} variant={'tertiary'}>
        Поиск
      </Button>
    </Link>
  );
};
