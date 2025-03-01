import { Link, useLoaderData } from 'react-router-dom';
import { Block } from 'shared/ui/block';
import './departmentsPage.scss';
import { DepartmentsType } from 'shared/types/departments';

export const DepartmentsPage = () => {
  const data = useLoaderData() as DepartmentsType;
  return (
    <div className="DepartmentsPage animation-reveal">
      {data.docs.map((Department, index) => (
        <Link key={index} to={'/departments/' + Department.id}>
          <Block>{Department.name}</Block>
        </Link>
      ))}
    </div>
  );
};
