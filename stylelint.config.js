// https://stylelint.io/user-guide/configure
module.exports = {
	extends: ['stylelint-config-standard'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'layer',
					'apply',
					'variants',
					'responsive',
					'screen'
				]
			}
		],
		indentation: 'tab',
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null,
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null
	}
};
