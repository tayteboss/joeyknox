// https://eslint.org/docs/user-guide/configuring/
module.exports = {
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2021,
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
		'plugin:jsdoc/recommended'
	],
	settings: {
		react: {
			version: 'detect'
		},
		jsdoc: {
			tagNamePreference: {
				returns: 'return'
			}
		}
	},
	plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier', 'jsdoc'],
	rules: {
		'func-style': [2, 'expression', { allowArrowFunctions: true }],
		'jsdoc/check-param-names': 0,
		'jsdoc/check-indentation': 'warn',
		'jsdoc/check-line-alignment': 0,
		'jsdoc/require-param': 0,
		'jsdoc/require-param-type': 0,
		'jsdoc/require-param-description': 0,
		'jsdoc/require-returns': 0,
		'jsdoc/require-returns-description': 0,
		'jsx-a11y/anchor-is-valid': 'off',
		'no-console': 0,
		'prettier/prettier': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 0,
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.js', '.jsx']
			}
		]
	}
};
