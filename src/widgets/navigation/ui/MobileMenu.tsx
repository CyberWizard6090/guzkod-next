import React, { useState, ReactNode } from 'react';
import { ReactComponent as List } from 'shared/assets/svg/bootstrap-icons-1.11.2/list.svg';
import { ReactComponent as Cross } from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import { ReactComponent as Home } from 'shared/assets/svg/bootstrap-icons-1.11.2/house-fill.svg';
import { ReactComponent as Chat } from 'shared/assets/svg/bootstrap-icons-1.11.2/chat-dots-fill.svg';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import { Link } from 'react-router-dom';
import './mobile-menu.scss';
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
        <Link to="/">
          <MobileMenuItem label={'Главная'} logo={Home} />
        </Link>
        <Link to="/feedback">
          <MobileMenuItem label={'Отзыв'} logo={Chat} />
        </Link>
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobileMenuPanel"
          aria-label="Открыть меню"
        >
          <MobileMenuItem label={'Меню'} logo={isOpen ? Cross : List} />
        </button>
      </div>
      <div
        className={`mobile-menu__overlay ${isOpen ? 'mobile-menu__overlay--active' : ''}`}
        onClick={closeMenu}
      >
        <div
          id="mobileMenuPanel"
          role="dialog"
          aria-modal="true"
          aria-label="Навигационное меню"
          className={`mobile-menu__panel ${isOpen ? 'mobile-menu__panel--open' : ''}`}
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
