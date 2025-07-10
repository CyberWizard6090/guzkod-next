import escapeHTML from 'escape-html';
import React, { Fragment } from 'react';
import { ExtractHostname } from 'shared/lib/extractHostname';
import { ImageView } from 'shared/ui/image';

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateTextAlign(node: { format: any }) {
  if (node.format === 'right') return 'text-right';
  if (node.format === 'center') return 'text-center';
  else return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function serializeLexicalRichText({ children, parentNode = {} }: any) {
  return (
    children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((node: any, i: React.Key | null | undefined) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const classNames: any = {
          h1: 'mt-6 text-5xl font-bold',
          h2: 'mt-5 text-4xl font-bold',
          h3: 'mt-4 text-3xl font-bold',
          h4: 'mt-3 text-2xl font-bold',
          h5: 'mt-2 text-xl font-bold',
          h6: 'mt-1 text-lg font-bold',
          p: 'paragraph',
          ul: 'list-disc',
          ol: 'list-decimal',
          li: 'list-item',
          blockquote: 'font-bold text-lg text-gray-600',
          a: 'text-blue-500 underline',
        };

        if (!node) return null;

        if (node.type === 'text') {
          let text = node.text ? (
            <span>{node.text}</span>
          ) : (
            <span className="opacity-0">&nbsp;</span>
          );

          if (node.format & IS_BOLD) {
            text = <strong>{text}</strong>;
          }

          if (node.format & IS_CODE) {
            text = <code>{text}</code>;
          }

          if (node.format & IS_ITALIC) {
            text = <em>{text}</em>;
          }

          if (node.format & IS_UNDERLINE) {
            text = <span className="underline">{text}</span>;
          }

          if (node.format & IS_STRIKETHROUGH) {
            text = <span className="line-through">{text}</span>;
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        if (node.type === 'heading') {
          return (
            <node.tag className={`${classNames[node.tag]} ${generateTextAlign(node)}`} key={i}>
              {serializeLexicalRichText({ children: node.children })}
            </node.tag>
          );
        }

        if (node.type === 'list') {
          const listClass =
            node.listType === 'bullet'
              ? classNames.ul
              : node.listType === 'number'
                ? classNames.ol
                : `${classNames.ul} list-none`;

          const Tag = node.listType === 'number' ? 'ol' : 'ul';

          return (
            <Tag className={listClass} key={i}>
              {serializeLexicalRichText({ children: node.children, parentNode: node })}
            </Tag>
          );
        }
        if (node.type === 'linebreak') {
          return <br key={i} />;
        }

        if (node.type === 'listitem' && node.checked) {
          return (
            <li className={`${classNames.li} flex gap-1`} key={i}>
              <div className="line-through">
                {serializeLexicalRichText({ children: node.children })}
              </div>
            </li>
          );
        } else if (node.type === 'listitem' && parentNode.listType === 'check') {
          return (
            <li className={`${classNames.li} flex gap-1`} key={i}>
              <div>{serializeLexicalRichText({ children: node.children })}</div>
            </li>
          );
        } else if (node.type === 'listitem') {
          return (
            <li className={`${classNames.li}`} key={i}>
              {serializeLexicalRichText({ children: node.children })}
            </li>
          );
        }

        switch (node.type) {
          case 'quote':
            return (
              <blockquote className={`${classNames.blockquote}`} key={i}>
                {serializeLexicalRichText({ children: node.children })}
              </blockquote>
            );
          case 'upload':
            return <ImageView url={node.value.url} key={i} />;
          case 'link':
            return (
              <a
                className={`link ${classNames.a}`}
                href={escapeHTML(node.fields?.linkType === 'custom' ? node?.fields?.url : '')}
                target={node.fields?.newTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label={`Ссылка: ${ExtractHostname(node.fields?.url || '')}`}
                title={node.fields?.url}
                key={i}
              >
                <span className="link__text">
                  {serializeLexicalRichText({ children: node.children })}
                </span>
                <span className="link__info" aria-hidden="true">
                  [{ExtractHostname(node.fields?.url || '')}]
                </span>
              </a>
            );
          case 'horizontalrule':
            return <hr key={i} />;
          case 'paragraph':
            return (
              <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
                {serializeLexicalRichText({ children: node.children })}
              </p>
            );
          default:
            return serializeLexicalRichText({ children: node.children });
        }
      })
      .filter((node: null) => node !== null)
  );
}
