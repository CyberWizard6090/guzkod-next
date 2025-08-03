const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const envPath = path.resolve(__dirname, envFile);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(`⚠️ Файл ${envFile} не найден, пытаемся загрузить .env`);
  dotenv.config();
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  throw new Error('❌ NEXT_PUBLIC_API_BASE_URL не определён в .env');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Отключаем стандартный loader для SVG
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Добавляем loader для SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
          },
        },
      ],
    });

    // Настраиваем css-loader для CSS Modules с кастомным префиксом
    config.module.rules.forEach((rule) => {
      if (!rule.oneOf) return;
      rule.oneOf.forEach((one) => {
        if (!one.use) return;

        const uses = Array.isArray(one.use) ? one.use : [one.use];

        uses.forEach((u) => {
          if (u.loader && u.loader.includes('css-loader') && u.options && u.options.modules) {
            u.options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
              const prefix = 'guzkod';
              const hash = Buffer.from(context.resourcePath)
                .toString('base64')
                .replace(/[^a-zA-Z0-9]/g, '')
                .slice(0, 5);

              return `${prefix}-${localName}__${hash}`;
            };
          }
        });
      });
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE}/api/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${API_BASE}/media/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
