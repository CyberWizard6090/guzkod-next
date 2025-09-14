import { Block } from '../block';
import './EmptyState.scss';
type EmptyStateProps = {
  title?: string;
  description?: string;
};

export const EmptyState = ({
  title = 'Страница медицинского учреждения',
  description = 'Временно не содержит материалов. Ждём вас на других страницах сайта',
}: EmptyStateProps) => {
  return (
    <Block>
      <div className="empty-state">
        {/* <div className="empty-state__icon"></div> */}
        <h1 className="empty-state__title">{title}</h1>
        <p className="empty-state__description">{description}</p>
      </div>
    </Block>
  );
};
