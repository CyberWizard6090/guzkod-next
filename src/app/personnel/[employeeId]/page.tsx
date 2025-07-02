import React from 'react';
import { Block } from 'shared/ui/block';
import { ImageView } from 'shared/ui/image';
import DefaultPhoto from 'shared/assets/image/400x300.png';
import 'shared/styles/pages/employee-page.scss';
import { getEmployeeById } from 'shared/api/personnel';
import Link from 'next/link';

export default async function EmployeePage({ params }: any) {
  const data = await getEmployeeById(params.employeeId);
  const Photo = data.photo?.sizes.card.url ?? DefaultPhoto.src;

  return (
    <div className="employee-page animation-reveal">
      <Block>
        <div className="employee-page__block">
          <div className="employee-page__photo">
            <ImageView url={Photo} />
          </div>
          <div className="employee-page__info">
            <header className="employee-page__header">
              <h2 className="employee-page__name">{data.fullName}</h2>
            </header>

            <h3 className="employee-page__position">{data.position}</h3>

            <div className="employee-page__departments">
              {data.departments?.map(
                (department: {
                  id: React.Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <Link
                    href={'/departments/' + department.id}
                    key={department.id}
                    className="employee-page__department-link"
                  >
                    <p>{department.name}</p>
                  </Link>
                ),
              )}
            </div>
            {data.education && <p className="employee-page__education">{data.education}</p>}
          </div>
        </div>
      </Block>
    </div>
  );
}
