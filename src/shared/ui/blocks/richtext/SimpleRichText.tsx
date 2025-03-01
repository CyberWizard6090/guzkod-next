import { RichTextParser } from './RichTextParser';
import './RichText.scss';

export function SimpleRichText({ body }: any) {
  return (
    <div className="block__richText">
      <RichTextParser content={body} className={undefined} customClassNames={undefined} />
    </div>
  );
}
