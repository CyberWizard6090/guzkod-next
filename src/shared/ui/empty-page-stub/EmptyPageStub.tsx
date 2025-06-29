import './EmptyPageStub.scss';
type EmptyPageStubProps = {
  title?: string;
  description?: string;
};

export const EmptyPageStub = ({
  title = 'Страница в разработке',
  description = 'Скоро здесь появится полезный контент.',
}: EmptyPageStubProps) => {
  return (
    <div className="empty-page-stub">
      {/* <div className="empty-page-stub__icon">🚧</div> */}
      <h1 className="empty-page-stub__title">{title}</h1>
      <p className="empty-page-stub__description">{description}</p>
    </div>
  );
};
