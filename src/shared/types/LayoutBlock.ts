import { RichTextBlock } from 'shared/types/RichTextBlock';
import { Image } from 'shared/types/image';
import { FileBlock } from 'shared/types/file';
type ImageBlock = {
  id: string;
  blockType: 'image';
  image: Image;
};
type ImagesBlock = {
  id: string;
  blockType: 'images';
  image: Image[];
};
type FileCollection = {
  files: FileBlock[];
};
type Heading = {
  id: string;
  text: string;
  blockType: 'heading';
};
export type LayoutBlock = RichTextBlock | ImageBlock | FileCollection | ImagesBlock | Heading;
