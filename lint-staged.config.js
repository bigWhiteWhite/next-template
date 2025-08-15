module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix --ignore-pattern "command/**" --no-warn-ignored', 'prettier --write'],
	'{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
	'package.json': ['prettier --write --ignore-path "command/**"'],
	'*.{scss,less,css}': ['stylelint --fix --allow-empty-input', 'prettier --write --ignore-path "command/**"'],
	'*.md': ['prettier --write --ignore-path "command/**"']
}
