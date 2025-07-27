import { Article } from 'shared/types/article';
import { Vacancy } from './vacancy';
export type SearchResultsType = {
  query: string;
  results: {
    Filesbox?: any[];
    article?: Article[];
    departments?: any[];

    employees?: any[];
    pages?: any[];
    vacancies?: Vacancy[];
  };
};
