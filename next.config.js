/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Удаляем стандартное поведение обработки SVG
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Добавляем SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // По желанию:
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
        destination: 'https://www.guzkod.ru/api/:path*',
      },
      {
        source: '/media/:path*',
        destination: 'https://www.guzkod.ru/media/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
