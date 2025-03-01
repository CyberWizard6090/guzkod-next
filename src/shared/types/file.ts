export type File = {
  id: string;
  name: string;
  filename: string;
  mimeType: string;
  filesize: number;
  createdAt: string;
  updatedAt: string;
  url: string;
};
export type FileBlock = {
  id: string;
  file: File;
};
