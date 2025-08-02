import './EmployeeCard.scss';
import { Block } from 'shared/ui/block';
import Link from 'next/link';
import DefaultPhoto from 'shared/assets/image/400x300.png';
import Image from 'next/image';
type PropsDepartment = {
  id: string;
  name: string;
};

type Props = {
  id: string;
  url: string;
  fullName: string;
  position: string;
  departments?: PropsDepartment[];
  education?: string;
};

export const Employee = ({ id, url, fullName, position, departments, education }: Props) => {
  return (
    <Block className="employee-card__block animation-reveal">
      <div className="employee-card">
        <div className="employee-card__photo">
          <Image
            src={url ? url : DefaultPhoto.src}
            alt={'фото ' + fullName}
            width={400}
            height={300}
          />
        </div>
        <Link href={'/personnel/' + id}>
          <div className="employee-card__info">
            <h3 className="employee-card__name">{fullName}</h3>
            <p className="employee-card__position">{position}</p>
            {departments?.map((department) => (
              <p key={department.id} className="employee-card__department">
                {department.name}
              </p>
            ))}
            {education ? <p className="employee-card__education">{education}</p> : <></>}
          </div>
        </Link>
      </div>
    </Block>
  );
};
