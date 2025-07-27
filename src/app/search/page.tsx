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
import { CardRead } from 'entities/card-read';
import { DepartmentCard } from 'entities/department-card';
import { File } from 'features/files';
import { Employee } from 'entities/employee-card';
import { Tabs, TabItem } from 'shared/ui/Tabs'; // добавим Tabs
import { SectionTitle } from 'shared/ui/section-title';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    getSearchResults(searchValue)
      .then((res: SearchResultsType) => {
        console.log('Результаты поиска:', res);
        setResults(res);
      })
      .catch((error: any) => {
        console.error('Ошибка при поиске:', error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

const allResults = (
  <VerticalContainer>
    {isLoading && <Loader />}

    {results?.results?.vacancies?.length > 0 && (
      <>
        <SectionTitle>Вакансии</SectionTitle>
        {results.results.vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} {...vacancy} />
        ))}
      </>
    )}

    {results?.results?.article?.length > 0 && (
      <>
        <SectionTitle>Новости и профилактика</SectionTitle>
        {results.results.article.map((article) => (
          <CardRead key={article.id} article={article} />
        ))}
      </>
    )}

    {results?.results?.departments?.length > 0 && (
      <>
        <SectionTitle>Отделения</SectionTitle>
        {results.results.departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </>
    )}

    {results?.results?.Filesbox?.length > 0 && (
      <>
        <SectionTitle>Файлы</SectionTitle>
        <Block>
        {results.results.Filesbox.map((file) => (
          <File key={file.url} name={file.name} filename={file.filename} url={file.url} />
        ))}
        </Block>
      </>
    )}

    {results?.results?.employee?.length > 0 && (
      <>
        <SectionTitle>Сотрудники</SectionTitle>
        {results.results.employee.map((employee) => (
          <Employee
            key={employee.id}
            id={employee.id}
            url={employee.photo?.sizes?.thumbnail?.url || ''}
            fullName={employee.fullName}
            position={employee.position}
            departments={employee.departments}
          />
        ))}
      </>
    )}

    {results?.results?.pages?.length > 0 && (
      <>
        <SectionTitle>Страницы</SectionTitle>
        {results.results.pages.map((page) => (
          <Link key={page.id} href={page.id}>
            <Block>{page.namepage}</Block>
          </Link>
        ))}
      </>
    )}
  </VerticalContainer>
);


  const tabs: TabItem[] = [
    {
      id: 'all',
      label: 'Все результаты',
      content: allResults,
    },
    results?.results?.vacancies?.length > 0 && {
      id: 'vacancies',
      label: 'Вакансии',
      content: (
        <VerticalContainer>
          <SectionTitle>Вакансии</SectionTitle>
          {results.results.vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} {...vacancy} />
          ))}
        </VerticalContainer>
      ),
    },
    results?.results?.article?.length > 0 && {
      id: 'articles',
      label: 'Новости и профилактика',
      content: (
        <VerticalContainer>
          <SectionTitle>Новости и профилактика</SectionTitle>
          {results.results.article.map((article) => (
            <CardRead key={article.id} article={article} />
          ))}
        </VerticalContainer>
      ),
    },
    results?.results?.departments?.length > 0 && {
      id: 'departments',
      label: 'Отделения',
      content: (
        <VerticalContainer>
          <SectionTitle>Отделения</SectionTitle>
          {results.results.departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </VerticalContainer>
      ),
    },
    results?.results?.employee?.length > 0 && {
      id: 'employees',
      label: 'Сотрудники',
      content: (
        <VerticalContainer>
          <SectionTitle>Сотрудники</SectionTitle>
          {results.results.employee.map((employee) => (
            <Employee
              key={employee.id}
              id={employee.id}
              url={employee.photo?.sizes?.thumbnail?.url || ''}
              fullName={employee.fullName}
              position={employee.position}
              departments={employee.departments}
            />
          ))}
        </VerticalContainer>
      ),
    },
    results?.results?.Filesbox?.length > 0 && {
      id: 'files',
      label: 'Файлы',
      content: (
        <VerticalContainer>
          <SectionTitle>Файлы</SectionTitle>
          <Block>
            {results.results.Filesbox.map((file) => (
              <File key={file.url} name={file.name} filename={file.filename} url={file.url} />
            ))}
          </Block>{' '}
        </VerticalContainer>
      ),
    },
    results?.results?.pages?.length > 0 && {
      id: 'pages',
      label: 'Страницы',
      content: (
        <VerticalContainer>
          <SectionTitle>Страницы</SectionTitle>
          {results.results.pages.map((page) => (
            <Link key={page.id} href={page.id}>
              <Block>{page.namepage}</Block>
            </Link>
          ))}
        </VerticalContainer>
      ),
    },
  ].filter(Boolean) as TabItem[]; // убираем пустые вкладки

  return (
    <VerticalContainer>
      {renderSearchForm()}
      {results && <Tabs tabs={tabs} defaultActiveId="all" />}
    </VerticalContainer>
  );
};

export default SearchPage;
