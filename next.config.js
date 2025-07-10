// next.config.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Загружаем переменные из нужного env файла
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
