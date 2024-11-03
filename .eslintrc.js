module.exports = {
  extends: [
    'react-app', // or your preferred base configuration
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    // other rules...
  },
};
