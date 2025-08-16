import styles from './EmployeeCard.module.scss';
import { Block } from 'shared/ui/block';
import Link from 'next/link';
import DefaultPhoto from 'shared/assets/image/400x300.png';
import Image from 'next/image';

type PropsDepartment = {
  id: string; // Уникальный идентификатор отдела
  name: string; // Наименование отдела
};

type Props = {
  id: string; // Уникальный идентификатор сотрудника
  url: string; // URL фотографии сотрудника
  fullName: string; // Полное имя сотрудника
  position: string; // Должность сотрудника
  departments?: PropsDepartment[]; // Список отделений, к которым принадлежит сотрудник
  education?: string; // Образование сотрудника (необязательное поле)
};

export const Employee = ({ id, url, fullName, position, departments, education }: Props) => {
  return (
    <Block className={styles['employee-card__block'] + ' animation-reveal'}>
      <div className={styles['employee-card']}>
        <div className={styles['employee-card__photo']}>
          <Image
            src={url ? url : DefaultPhoto.src}
            alt={'фото ' + fullName}
            width={400}
            height={300}
          />
        </div>
        <Link href={'/personnel/' + id}>
          <div className={styles['employee-card__info']}>
            <h3 className={styles['employee-card__info__name']}>{fullName}</h3>
            <p className={styles['employee-card__info__position']}>{position}</p>
            {departments?.map((department) => (
              <p key={department.id} className={styles['employee-card__info__department']}>
                {department.name}
              </p>
            ))}
            {education && (
              <p className={styles['employee-card__info__education']}>{education}</p>
            )}
          </div>
        </Link>
      </div>
    </Block>
  );
};
