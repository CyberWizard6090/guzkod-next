import { getVacanciesById } from 'shared/api/vacancies';
import { formatDate } from 'shared/lib/format';
import { Block } from 'shared/ui/block';
import { SimpleRichText } from 'shared/ui/blocks';
import 'shared/styles/pages/vacancy-page.scss';
import AlignWrapper from 'shared/ui/align-wrapper';
import { ShareButton } from 'features/share';
import { Metadata } from 'next';
import { SITE_HOST } from 'shared/consts/site.constants';
import { cleanMetaDescription } from 'shared/lib/seo/cleanMetaDescription';

type PageParams = {
  vacanciesId: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> => {
  const { vacanciesId } = await params;
  const data = await getVacanciesById(vacanciesId);

  const title = `Вакансия: ${data.title}`;
  const description = cleanMetaDescription({ text: data.description });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_HOST}/vacancies/${vacanciesId}`,
    },
  };
};

const EmployeePage = async ({ params }: { params: Promise<PageParams> }) => {
  const { vacanciesId } = await params;
  const data = await getVacanciesById(vacanciesId);
  return (
    <Block>
      <div className="vacancy-page animation-reveal">
        {data?.title && <h1 className="vacancy-page__title">{data.title}</h1>}

        <div className="vacancy-page__details">
          {data?.department && <p className="vacancy-page__department">Отдел: {data.department}</p>}
          {data?.location && (
            <p className="vacancy-page__location">Местоположение: {data.location}</p>
          )}
          {data?.publishedDate && (
            <p className="vacancy-page__published-date">
              Дата публикации: {formatDate(data.publishedDate)}
            </p>
          )}
          {data?.salary && <p className="vacancy-page__salary">Зарплата: {data.salary}</p>}
        </div>

        {data?.description && (
          <div className="vacancy-page__description">
            <h2>Описание вакансии</h2>
            <p>{data.description}</p>
          </div>
        )}

        {data?.requirements && (
          <div className="vacancy-page__sections">
            <h3>Требования</h3>
            <SimpleRichText body={data.requirements} />
          </div>
        )}
        {data?.responsibilities && (
          <div className="vacancy-page__sections">
            <h3>Обязанности</h3>
            <SimpleRichText body={data.responsibilities} />
          </div>
        )}
        {data?.conditions && (
          <div className="vacancy-page__sections">
            <h3>Условия</h3>
            <SimpleRichText body={data.conditions} />
          </div>
        )}
      </div>
      <AlignWrapper align="right">
        <ShareButton title={'data.title'} />
      </AlignWrapper>
    </Block>
  );
};
export default EmployeePage;
