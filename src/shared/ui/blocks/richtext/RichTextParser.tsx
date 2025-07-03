import serializeLexicalRichText from './serializeLexicalRichText';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RichTextParser = ({ className, content, customClassNames }: any) => {
  if (!content?.root?.children) return <></>;

  return (
    <div className={`${[className].filter(Boolean).join(' ')} richText`}>
      {serializeLexicalRichText({
        children: content.root.children,
        customClassNames,
      })}
    </div>
  );
};
