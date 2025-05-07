export const transliterateForURL = (text: string) => {
  const translitMap: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ы: 'y',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ъ: '',
    ь: '',
    і: 'i',
    ї: 'yi',
    є: 'ye',
    ґ: 'g',
  };

  return text
    .split('')
    .map((char) => translitMap[char.toLowerCase()] || char) // Заменяем русские буквы на латинские
    .join('')
    .toLowerCase() // Преобразуем все в нижний регистр
    .replace(/[^a-z0-9-]/g, '') // Убираем все символы, которые не являются буквами, цифрами или дефисами
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/--+/g, '-') // Убираем лишние дефисы, если они есть
    .replace(/^-+|-+$/g, ''); // Убираем дефисы в начале и в конце строки
};
