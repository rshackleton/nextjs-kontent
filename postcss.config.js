module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production'
        ? {
            content: ['./components/**/*.tsx', './pages/**/*.tsx'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }
        : false,
    ],
  ],
};
