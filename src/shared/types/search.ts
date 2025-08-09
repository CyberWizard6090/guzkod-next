import { Article } from 'shared/types/article';
import { Vacancy } from './vacancy';
import { EmployeeType } from './employee';
export type SearchResultsType = {
  query: string;
  results: {
    Filesbox?: any[];
    article?: Article[];
    departments?: any[];
    employee?: EmployeeType[];
    pages?: any[];
    vacancies?: Vacancy[];
  };
};
