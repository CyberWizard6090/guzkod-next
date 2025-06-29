import './VacancyCard.scss';
import { Block } from 'shared/ui/block';
import Link from 'next/link';
import { formatDate } from 'shared/lib/format';

type Vacancy = {
  id: string;
  title: string;
  department?: string;
  location?: string;
  salary?: string;
  publishedDate: string;
  description?: string;
  isActive?: boolean;
};

export const VacancyCard = ({
  id,
  title,
  department,
  location,
  salary,
  publishedDate,
  description,
  isActive,
}: Vacancy) => {
  return (
    <Block className="vacancy-card__block animation-reveal">
      <div className="vacancy-card">
        <Link href={`/vacancies/${id}`}>
          <div className="vacancy-card__info">
            <div className="vacancy-card__header">
              <div>{formatDate(publishedDate)}</div>
              <div className={`vacancy-card__status ${isActive ? 'active' : 'inactive'}`}>
                {isActive ? 'Открыта' : 'Закрыта'}
              </div>
            </div>
            <h3 className="vacancy-card__title">{title}</h3>
            {department && <p className="vacancy-card__department">{department}</p>}
            {location && <p className="vacancy-card__location">Локация: {location}</p>}
            {salary && <p className="vacancy-card__salary">Зарплата: {salary}</p>}
            {description && <p className="vacancy-card__description">{description}</p>}
          </div>
        </Link>
      </div>
    </Block>
  );
};
