/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 0, // 不强制要求组件名
  }
}
