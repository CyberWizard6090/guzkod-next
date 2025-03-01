import { Employee } from 'entities/Employee';
import { EmployeeType } from 'shared/types/employee';
import './EmployeeList.scss';
type Props = {
  List: EmployeeType[];
};

export const EmployeeList = ({ List }: Props) => {
  return (
    <div className="employee-list">
      {List &&
        List.map((employee: EmployeeType) => (
          <Employee
            key={employee.id}
            id={employee.id}
            url={employee.photo?.sizes?.thumbnail?.url || ''}
            fullName={employee.fullName}
            position={employee.position}
            departments={employee.departments}
            // education={employee.education}
          />
        ))}
    </div>
  );
};
