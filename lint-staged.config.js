module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
	'package.json': ['prettier --write'],
	'*.{scss,less,css}': ['stylelint --fix --allow-empty-input', 'prettier --write'],
	'*.md': ['prettier --write']
}
