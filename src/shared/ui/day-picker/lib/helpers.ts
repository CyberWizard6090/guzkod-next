export const parseDate = (str: string): Date | null => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = regex.exec(str);
  if (!match) return null;

  const [, y, m, d] = match;
  const date = new Date(+y, +m - 1, +d);
  return isNaN(date.getTime()) ? null : date;
};

export const formatDate = (date: Date): string =>
  `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
