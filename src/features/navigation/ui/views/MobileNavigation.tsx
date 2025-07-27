'use client';
import React, { useState, ReactNode } from 'react';
import List from 'shared/assets/svg/bootstrap-icons-1.11.2/list.svg';
import IconCross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import IconHome from 'shared/assets/svg/bootstrap-icons-1.11.2/house-fill.svg';
import IconChat from 'shared/assets/svg/bootstrap-icons-1.11.2/chat-dots-fill.svg';
import IconSearch from 'shared/assets/svg/bootstrap-icons-1.11.2/search.svg';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import 'features/navigation/ui/styles/MobileNavigation.scss';
import Link from 'next/link';
type MobileMenuProps = {
  children: ReactNode;
};

type MobileMenuItemProps = {
  label: string;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const MobileMenuItem = ({ label, logo: Logo }: MobileMenuItemProps) => (
  <div className="mobile-menu__item">
    <div className="mobile-menu__logo">
      <Logo />
    </div>
    <span className="mobile-menu__title">{label}</span>
  </div>
);
export const MobileMenu = ({ children }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  useDisableScroll(isOpen);

  return (
    <>
      <div className="mobile-menu__toggle">
        <Link href="/">
          <MobileMenuItem label={'Главная'} logo={IconHome} />
        </Link>
        <Link href="/feedback">
          <MobileMenuItem label={'Обратная связь'} logo={IconChat} />
        </Link>
        <Link href="/search">
          <MobileMenuItem label={'Поиск'} logo={IconSearch} />
        </Link>
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobileMenuPanel"
          aria-label="Открыть меню"
        >
          <MobileMenuItem label={'Меню'} logo={isOpen ? IconCross : List} />
        </button>
      </div>
      <div
        className={`mobile-menu__overlay ${isOpen ? 'mobile-menu__overlay--open' : ''}`}
        onClick={closeMenu}
      >
        <div className="mobile-menu__backdrop" />
        <div
          id="mobileMenuPanel"
          role="dialog"
          aria-modal="true"
          aria-label="Навигационное меню"
          className={'mobile-menu__panel '}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="mobile-menu__content"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('a')) {
                closeMenu();
              }
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
