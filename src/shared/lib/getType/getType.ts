export const getType = (File: string) => {
  const FileType: string | undefined = File.split('.').pop();
  return FileType;
};
