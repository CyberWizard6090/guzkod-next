export const GanerateID = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const password = Array.from({ length }, () => Math.floor(Math.random() * chars.length)).join('');
  return password;
};
