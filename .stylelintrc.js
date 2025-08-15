module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended', 'stylelint-config-tailwindcss', 'stylelint-config-prettier'],
	plugins: ['stylelint-order'],
	rules: {
		'order/properties-alphabetical-order': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer', 'theme']
			}
		],
		'selector-class-pattern': null,
		'no-descending-specificity': null,
		'declaration-block-trailing-semicolon': 'always',
		indentation: 2,
		linebreaks: 'unix',
		'at-rule-name-case': 'lower',
		'at-rule-name-space-after': 'always',
		'at-rule-semicolon-newline-after': 'always',
		'at-rule-semicolon-space-before': 'never'
	},
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
}
