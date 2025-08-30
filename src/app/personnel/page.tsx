import { PersonnelList } from 'features/personnel-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сотрудники',
  description: 'Список сотрудников нашей медицинской организации',
  openGraph: {
    title: 'Сотрудники',
    description: 'Список сотрудников нашей медицинской организации',
  },
  twitter: {
    title: 'Сотрудники',
    description: 'Список сотрудников нашей медицинской организации',
  },
};

const PersonnelPage = () => {
  return <PersonnelList />;
};
export default PersonnelPage;
