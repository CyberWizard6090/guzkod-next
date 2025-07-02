import { RichTextParser } from './RichTextParser';
import './RichText.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SimpleRichText({ body }: any) {
  return (
    <div className="block__richText">
      <RichTextParser content={body} className={undefined} customClassNames={undefined} />
    </div>
  );
}
