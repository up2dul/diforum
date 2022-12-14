module.exports = {
  // Type check TypeScript files
  './src/**/*.{ts,tsx}': () => 'yarn tsc --noEmit',

  // Lint & Prettify TS and TSX files
  './src/**/*.{ts,tsx}': filenames => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')} --config ./.prettierrc`
  ],
};
