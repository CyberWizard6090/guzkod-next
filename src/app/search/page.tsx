'use client';
import { useState } from 'react';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';
import { VoiceInput } from 'shared/ui/input';
import { Page } from 'shared/ui/page';
import { getSearchResults } from 'shared/api/search';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = () => {
    // Здесь можно добавить логику для обработки поиска
    console.log('Поиск:', searchValue);
    getSearchResults(searchValue)
      .then((results: any) => {
        console.log('Результаты поиска:', results);
      })
      .catch((error: any) => {
        console.error('Ошибка при поиске:', error);
      });
  };
  return (
    <Page>
      <Block>
        <VoiceInput
          placeholder="Поиск"
          name="search"
          value={searchValue}
          onChange={setSearchValue}
        />
        <Button onClick={handleSearch}>Поиск</Button>
      </Block>
    </Page>
  );
};

export default SearchPage;

