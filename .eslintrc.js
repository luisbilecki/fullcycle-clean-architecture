/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/adjacent-overload-signatures": "off",
        "@typescript-eslint/no-explicit-any": "off"
    }
};