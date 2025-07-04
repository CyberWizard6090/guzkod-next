import Link from 'next/link';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';
import { Page } from 'shared/ui/page';

export default function ReviewsPage() {
  return (
    <Page>
      <Block>
        <h2>Оставьте свой отзыв</h2>
        <p>Нам важно ваше мнение! Пожалуйста, поделитесь своим опытом.</p>
        <Link href={'/reviews/form'}>
          <Button>Оставить отзыв</Button>
        </Link>
      </Block>
      <Block>
        <EmptyPageStub
          title={'Мы ценим ваше мнение'}
          description={
            'На этой странице пока нет отзывов, но мы будем рады, если вы станете первым, кто поделится своим опытом получения медицинской помощи в нашем учреждении.'
          }
        />
      </Block>
    </Page>
  );
}
