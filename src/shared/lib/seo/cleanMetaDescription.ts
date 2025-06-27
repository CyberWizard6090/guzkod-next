type CleanMetaDescriptionParams = {
  text: string;
  maxLength?: number;
};

export const cleanMetaDescription = ({
  text,
  maxLength = 160,
}: CleanMetaDescriptionParams): string => {
  if (!text) return '';

  let cleaned = text
    .replace(/<\/?[^>]+(>|$)/g, '') // Удаляем HTML теги
    .replace(/[\r\n\t]+/g, ' ') // Убираем переносы строк и табы
    .replace(/\s{2,}/g, ' ') // Заменяем множественные пробелы на один
    .trim();

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength - 1).trimEnd() + '…';
  }

  return cleaned;
};
