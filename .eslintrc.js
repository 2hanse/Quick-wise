module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-require-imports": [
      "error",
      {
        allow: [
          "\\.png$",
          "\\.jpg$",
          "\\.jpeg$",
          "\\.gif$",
          "\\.svg$",
          "\\.webp$",
          "\\.json$",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["tailwind.config.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
