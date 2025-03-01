export type TextNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

type Paragraph = {
  children: TextNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};

export type ListItem = {
  children: TextNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  value: number;
};

type List = {
  children: ListItem[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  listType: string;
  start: number;
  tag: string;
};
type Root = {
  children: (Paragraph | List)[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};

export type RichTextBlock = {
  id: string;
  blockType: 'simpleRichText';
  body: {
    root: Root;
  };
};
