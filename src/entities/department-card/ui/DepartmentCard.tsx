import Link from 'next/link';
import React from 'react';
import { DepartmentType } from 'shared/types/departments';
import { Block } from 'shared/ui/block';
import './DepartmentCard.scss';

type Props = {
  department: DepartmentType;
};

export const DepartmentCard = ({ department }: Props) => {
  return (
    <Link href={'/departments/' + department.id}>
      <Block>
        <div className="department-card__inner">
          {department.image && (
            <img
              src={department.image.sizes.tablet.url}
              alt={department.name}
              className="department-card__image"
            />
          )}
          <div className="department-card__content">
            <h3 className="department-card__title">{department.name}</h3>
          </div>
        </div>
      </Block>
    </Link>
  );
};
