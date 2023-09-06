module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    'plugin:react-hooks/recommended',
    // "plugin:import/typescript",
    // "plugin:import/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "vite.config.ts", "supported-types.d.ts"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
   },
  plugins: [
    'react-refresh',
    "@typescript-eslint",
    "prettier",
    "react",
    "prefer-arrow",
    "unused-imports",
    "import",
    "@emotion"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/no-unsafe-argument": 1,
    "@typescript-eslint/consistent-type-definitions": [1, "type"],
    "@typescript-eslint/no-unused-vars": 1,
    "react/no-unknown-property": ['error', { ignore: ['css'] }]
  },
}
