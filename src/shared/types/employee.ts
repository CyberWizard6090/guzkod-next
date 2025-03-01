import { ImageSize } from 'shared/types/image';

export type EmployeeType = {
  id: string;
  fullName: string;
  position: string;
  education: string;
  departments: {
    id: string;
    name: string;
  }[];
  photo?: {
    sizes: {
      thumbnail: ImageSize;
      card: ImageSize;
      tablet: ImageSize;
    };
  };
};
export type PersonnelType = {
  docs: EmployeeType[];
};
