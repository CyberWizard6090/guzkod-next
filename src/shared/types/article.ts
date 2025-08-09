import { LayoutBlock } from 'shared/types/LayoutBlock';
import { Image } from 'shared/types/image';
export type Article = {
  id: string;
  type: string;
  slug: string;
  date: string;
  title: string;
  wallpaper: Image;
  text: string;
  layout: LayoutBlock[];
};

export type ArticleResponse = {
  length: number;
  docs: Article[];
  globalType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
