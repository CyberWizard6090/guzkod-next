'use client';
import { useState } from 'react';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';
import { VoiceInput } from 'shared/ui/input';
import { VerticalContainer } from 'shared/ui/vertical-container';
import { getSearchResults } from 'shared/api/search';
import AlignWrapper from 'shared/ui/align-wrapper';

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
    <VerticalContainer>
      <Block>
        <AlignWrapper align={'left'}>
          <VoiceInput
            placeholder="Поиск"
            name="search"
            value={searchValue}
            onChange={setSearchValue}
          />
          <Button onClick={handleSearch}>Поиск</Button>
        </AlignWrapper>
      </Block>
    </VerticalContainer>
  );
};

export default SearchPage;
