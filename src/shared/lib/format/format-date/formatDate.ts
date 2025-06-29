export const formatDate = (dateInput: string | Date, locale: string = 'ru-DE'): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;

  return date.toLocaleString(locale, options);
};
