import { ReactComponent as Logo } from 'shared/assets/svg/bootstrap-icons-1.11.2/list.svg';
import { ReactComponent as Icon2 } from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import { ReactComponent as Home } from 'shared/assets/svg/bootstrap-icons-1.11.2/house-fill.svg';
import { ReactComponent as Chat } from 'shared/assets/svg/bootstrap-icons-1.11.2/chat-dots-fill.svg';
import { useDeviceDetect } from 'shared/lib/WindowSizeListener';
import './navMobile.scss';
import { Link } from 'react-router-dom';

type Props = {
  toggleState: () => void;
  state: boolean;
};
type itemProps = {
  onClick?: () => void;
  Title: string;
  Logo: any;
};
export const NavMobile = ({ toggleState, state }: Props) => {
  const { isMobile } = useDeviceDetect();
  const ItemMenu = ({ onClick, Title, Logo }: itemProps) => {
    return (
      <div className="NavMobile__item ">
        <div className="NavMobile__logo " onClick={onClick}>
          {Logo}
        </div>
        <div className="NavMobile__title">{Title}</div>
      </div>
    );
  };
  if (isMobile) {
    return (
      <div className="NavMobile">
        <Link to={'/'}>
          {' '}
          <ItemMenu Title={'Главная'} Logo={<Home />} />{' '}
        </Link>

        <ItemMenu Title={'Меню'} Logo={state ? <Icon2 /> : <Logo />} onClick={toggleState} />
        <Link to={'/feedback'}>
          {' '}
          <ItemMenu Title={'Обращение'} Logo={<Chat />} />{' '}
        </Link>
      </div>
    );
  }
  return null;
};
