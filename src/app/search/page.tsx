'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { VerticalContainer } from 'shared/ui/vertical-container';
import { getSearchResults } from 'shared/api/search';
import { HorizontalContainer } from 'shared/ui/horizontal-container';
import { Loader } from 'shared/ui/loader';
import { VacancyCard } from 'entities/vacancy-card';
import { SearchResultsType } from 'shared/types/search';
import { DepartmentCard } from 'entities/department-card';
import { File } from 'features/files';
import { Employee } from 'entities/employee-card';
import { TabItem, Tabs } from 'shared/ui/tabs';
export type { TabItem } from 'shared/ui/tabs';
import { SectionTitle } from 'shared/ui/section-title';
import { EmptyState } from 'shared/ui/empty-state';
import { ArticleCard } from 'entities/article-card';
import type { Vacancy } from 'shared/types/vacancy';
import type { Article } from 'shared/types/article';
import type { DepartmentType } from 'shared/types/departments';
import type { FileType } from 'shared/types/file';
import type { EmployeeType } from 'shared/types/employee';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const r = results?.results ?? {};

  const handleSearch = () => {
    setIsLoading(true);
    getSearchResults(searchValue)
      .then((res) => {
        console.log('Результаты поиска:', res);
        setResults(res);
      })
      .catch((error) => {
        console.error('Ошибка при поиске:', error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const renderSearchForm = () => (
    <Block>
      <HorizontalContainer>
        <Input
          placeholder="Поиск"
          name="search"
          value={searchValue}
          onChange={setSearchValue}
          onKeyDown={handleKeyDown}
          label=""
        />
        <Button onClick={handleSearch}>Поиск</Button>
      </HorizontalContainer>
    </Block>
  );

  const sections = [
    {
      id: 'vacancies',
      label: 'Вакансии',
      data: r.vacancies ?? [],
      render: (vacancy: Vacancy) => <VacancyCard key={vacancy.id} {...vacancy} />,
    },
    {
      id: 'articles',
      label: 'Новости и профилактика',
      data: r.article ?? [],
      render: (article: Article) => <ArticleCard key={article.id} article={article} />,
    },
    {
      id: 'departments',
      label: 'Отделения',
      data: r.departments ?? [],
      render: (department: DepartmentType) => (
        <DepartmentCard key={department.id} department={department} />
      ),
    },
    {
      id: 'files',
      label: 'Файлы',
      data: r.filesbox ?? [],
      render: (file: FileType) => (
        <File key={file.url} name={file.name} filename={file.filename} url={file.url} />
      ),
      wrapInBlock: true,
    },
    {
      id: 'employees',
      label: 'Сотрудники',
      data: r.employee ?? [],
      render: (employee: EmployeeType) => (
        <Employee
          key={employee.id}
          id={employee.id}
          url={employee.photo?.sizes?.thumbnail?.url || ''}
          fullName={employee.fullName}
          position={employee.position}
          departments={employee.departments}
        />
      ),
    },
    {
      id: 'pages',
      label: 'Страницы',
      data: r.pages ?? [],
      render: (page: any) => (
        <Link key={page.id} href={page.id}>
          <Block>{page.namepage}</Block>
        </Link>
      ),
    },
  ];

  const renderSection = (
    title: string,
    items: any[],
    renderItem: (item: any) => JSX.Element,
    wrapInBlock?: boolean,
  ) => (
    <VerticalContainer>
      <SectionTitle>{title}</SectionTitle>
      {wrapInBlock ? <Block>{items.map(renderItem)}</Block> : items.map(renderItem)}
    </VerticalContainer>
  );

  const allResults = (
    <VerticalContainer>
      {isLoading && <Loader />}
      {sections.map(
        (s) => s.data.length > 0 && renderSection(s.label, s.data, s.render, s.wrapInBlock),
      )}
    </VerticalContainer>
  );

  const tabs: TabItem[] = [
    { id: 'all', label: 'Все результаты', content: allResults },
    ...sections
      .filter((s) => s.data.length > 0)
      .map((s) => ({
        id: s.id,
        label: s.label,
        content: (
          <VerticalContainer>
            {renderSection(s.label, s.data, s.render, s.wrapInBlock)}
          </VerticalContainer>
        ),
      })),
  ];

  return (
    <VerticalContainer>
      {renderSearchForm()}
      {results ? (
        sections.every((s) => s.data.length === 0) ? (
          <EmptyState
            title="Ничего не найдено"
            description="Попробуйте изменить запрос или фильтры"
          />
        ) : (
          <Tabs tabs={tabs} defaultActiveId="all" />
        )
      ) : null}
    </VerticalContainer>
  );
};

export default SearchPage;
