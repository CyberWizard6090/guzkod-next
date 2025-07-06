import clsx from 'clsx';
import './MultilineText.scss';

type MultilineTextProps = {
  text?: string;
  className?: string;
};

export const MultilineText = ({ text = '', className }: MultilineTextProps) => {
  const lines = text
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <div className={clsx('multiline-text', className)}>
      {lines.map((line, idx) => (
        <p key={idx} className="multiline-text__line">
          {line}
        </p>
      ))}
    </div>
  );
};
