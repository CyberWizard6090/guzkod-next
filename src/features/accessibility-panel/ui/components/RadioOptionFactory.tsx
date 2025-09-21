import clsx from 'clsx';
import React from 'react';
import './ColorSchemeOption.scss';
type RadioOption = {
  label: string;
  value: string;
  preview?: React.ReactNode;
};

export const buildRadioOptions = (
  name: string,
  options: { label: string; value: string }[],
): RadioOption[] => {
  switch (name) {
    case 'fontSize':
      return options.map((opt) => {
        const size =
          opt.value === 'small'
            ? '12px'
            : opt.value === 'normal'
              ? '16px'
              : opt.value === 'large'
                ? '20px'
                : opt.value === 'xl'
                  ? '24px'
                  : opt.value === 'xxl'
                    ? '32px'
                    : '16px';

        return {
          ...opt,
          preview: <span style={{ fontSize: size }}> {opt.label}</span>,
        };
      });
    case 'fontFamily':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <span
            style={{
              fontFamily: opt.value.includes('mono')
                ? 'monospace'
                : opt.value.includes('sans')
                  ? 'Arial'
                  : 'Georgia',
            }}
          >
            {opt.label}
          </span>
        ),
      }));

    case 'colorScheme':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <div className="color-scheme-option">
            <span
              className={clsx(
                'color-scheme-option__preview',
                `color-scheme-option__preview--${opt.value || 'default'}`,
              )}
            />
            <span className="color-scheme-option__label">{opt.label}</span>
          </div>
        ),
      }));

    case 'letterSpacing':
      return options.map((opt) => ({
        ...opt,
        preview: <span style={{ letterSpacing: opt.value }}>{opt.label}</span>,
      }));

    case 'lineHeight':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <div style={{ lineHeight: opt.value, fontSize: 14 }}>
            Пример текста <br /> с интервалом {opt.value}
          </div>
        ),
      }));

    case 'cursorSize':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <div
            style={{
              fontSize: opt.value === 'small' ? 12 : opt.value === 'medium' ? 18 : 26,
            }}
          >
            🖱️
          </div>
        ),
      }));

    case 'animations':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <span
            style={{
              display: 'inline-block',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#4caf50',
              animation:
                opt.value === 'full'
                  ? 'pulse 1s infinite'
                  : opt.value === 'reduced'
                    ? 'pulse 3s infinite'
                    : 'none',
            }}
          />
        ),
      }));

    case 'imageMode':
      return options.map((opt) => ({
        ...opt,
        preview: (
          <>
            <svg
              viewBox="0 0 50 35"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 40,
                height: 30,
                borderRadius: 4,
                objectFit: 'cover',
                filter:
                  opt.value === 'grayscale'
                    ? 'grayscale(100%)'
                    : opt.value === 'high-contrast'
                      ? 'contrast(200%) brightness(80%)'
                      : 'none',
              }}
            >
              <rect width="50" height="35" fill="#87CEEB" />
              <circle cx="15" cy="15" r="7" fill="#FFD700" />
              <rect x="25" y="20" width="20" height="10" fill="#228B22" />
            </svg>
            <span style={{ marginLeft: 8 }}>{opt.label}</span>
          </>
        ),
      }));

    default:
      return options;
  }
};
