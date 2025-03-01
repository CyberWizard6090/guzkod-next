export type ImageSize = {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
};

export type Image = {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: {
    thumbnail: ImageSize;
    card: ImageSize;
    tablet: ImageSize;
  };
  createdAt: string;
  updatedAt: string;
  url: string;
};
