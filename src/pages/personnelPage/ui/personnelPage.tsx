import { EmployeeList } from 'widgets/EmployeeList';
import { PersonnelType } from 'shared/types/employee';
import { useLoaderData } from 'react-router-dom';
import './personnelPage.scss';
export const PersonnelPage = () => {
  const data = useLoaderData() as PersonnelType;
  return (
    <div className="Personnel animation-reveal">
      <h2>Список сотрудников</h2>
      <EmployeeList List={data.docs} />
    </div>
  );
};
