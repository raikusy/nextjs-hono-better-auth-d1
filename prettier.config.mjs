/** @type {import('prettier').Config} */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: 'es5',
  arrowParens: 'always',
  importOrderSeparation: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
};

export default config;
