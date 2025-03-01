import { RenderBlocks } from 'entities/blocks';
import { Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Empty } from 'shared/ui/empty';
import { Loader } from 'shared/ui/loader';
import { Page } from 'shared/ui/page';
export const DefaultPage = () => {
  const data: any = useLoaderData();
  const text =
    'К сожалению, на этой странице возникла техническая ошибка.\n Мы уже работаем над ее устранением и приносим извинения за неудобства. Пожалуйста, попробуйте вернуться позже.';
  const date = new Date(data.date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const Header = () => {
    return (
      <div>
        <span>{date.toLocaleString('ru-DE', options)}</span>
        <h1>{data.title}</h1>
      </div>
    );
  };
  return (
    <Page>
      {data.title ? <Header /> : <></>}

      <Suspense fallback={<Loader />}>
        <RenderBlocks layout={data.layout} />
        {data.layout.length === 0 ? <Empty text={text} /> : <></>}
      </Suspense>
    </Page>
  );
};
