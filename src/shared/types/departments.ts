import { Image } from 'shared/types/image';
import { EmployeeType } from 'shared/types/employee';
import { ListItem, TextNode } from './RichTextBlock';
type Description = {
  root: {
    children: (TextNode | ListItem)[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
  createdAt: string;
  updatedAt: string;
};
export type DepartmentType = {
  id: string;
  name: string;
  image: Image;
  description: Description;
  employee: EmployeeType[];
};
export type DepartmentsType = {
  docs: DepartmentType[];
};
