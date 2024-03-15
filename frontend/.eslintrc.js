module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    // 프로젝트 요구사항에 맞는 커스텀 규칙 추가
  },
};
