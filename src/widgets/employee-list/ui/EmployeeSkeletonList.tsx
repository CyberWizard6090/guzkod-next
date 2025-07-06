import { EmployeeSkeleton } from 'entities/employee-card';
import React from 'react';

type Props = {
  count?: number;
};

export const EmployeeSkeletonList = ({ count = 4 }: Props) => {
  return (
    <div className="employee-list">
      {Array.from({ length: count }).map((_, index) => (
        <EmployeeSkeleton key={index} />
      ))}
    </div>
  );
};
