/**
 * ? 本脚本用于实现新包快速开始构建
 * @description 已实现翻译文件创建
 * @description 已实现新路由，新组件创建
 **/
import chalk from 'chalk'
import fs from 'fs'
import handlebars from 'handlebars'
import _ from 'lodash'
import ora from 'ora'
import path from 'path'
import { Auxiliary } from './auxiliary.mjs'

const readSpinner = ora(chalk.green('开始生成...'))
export class CreateApp {
	appName = ''
	configPath = ''
	componentPath = ''
	imagePath = ''
	appPagePath = ''
	pageTemplatePath = ''

	constructor(appName) {
		this.appName = appName
		this.configPath = `command/config.json`
		this.componentPath = `app_pages`
		this.imagePath = `public/image`
		this.appPagePath = `app/[locale]`
		this.pageTemplatePath = `command/templates/app_pages`
		this.appTemplatePath = `command/templates/app`
		this.appThemePath = `command/templates/theme`
		this.appLangPath = `command/templates/lang`
	}

	judgeFileExist(type, inputPath) {
		if (type === 'file') {
			return fs.existsSync(path.resolve(inputPath))
		} else if (type === 'dir') {
			if (fs.existsSync(path.resolve(inputPath))) {
				return fs.lstatSync(path.resolve(inputPath)).isDirectory()
			} else {
				return false
			}
		}
	}

	async createLangTheme(data) {
		const { hashName, locales } = data
		const themePath = `theme/index`
		const defaultThemePath = `${this.appThemePath}/default.css`
		const defaultLangPath = `${this.appLangPath}/default.json`
		// 主题
		if (!this.judgeFileExist('file', `${themePath}.css`)) {
			if (this.judgeFileExist('file', defaultThemePath)) {
				readSpinner.succeed(`抓取全局主题`)
				if(!this.judgeFileExist('dir', 'theme')) fs.mkdirSync('theme', { recursive: true })
				if(!this.judgeFileExist('file', `${themePath}.css`)) {
					const jsonData = fs.readFileSync(path.resolve(defaultThemePath), 'utf8')
					fs.writeFileSync(path.resolve(`${themePath}.css`), jsonData)
					readSpinner.succeed(`生成${themePath}主题文件`)
				}
			}
		}
		let finalLocales = []
		finalLocales = _.uniq(locales)
		// 语言
		await Promise.all(
			finalLocales.map(async (item) => {
				if (this.judgeFileExist('file', defaultLangPath)) {
					readSpinner.succeed(`抓取默认语言文件 - ${item}`)
					if(!this.judgeFileExist('dir', 'lang')) fs.mkdirSync('lang', { recursive: true })
					if(!this.judgeFileExist('file', `lang/${item}.json`)) {
						const jsonData = fs.readFileSync(path.resolve(defaultLangPath), 'utf8')
						fs.writeFileSync(path.resolve(`lang/${item}.json`), jsonData)
						readSpinner.succeed(`生成${hashName}语言包-${item}`)
					}
				}
			})
		)
	}

	async createImage(data) {
		const { routerList } = data
		const list = routerList.map((item) => {
			if (item === '/') return '/home'
			else return item
		})
		list.concat(['/header', '/footer']).map(async (item) => {
			const imagePath = `${this.imagePath}${item}`
			if (!this.judgeFileExist('dir', imagePath)) {
				fs.mkdirSync(path.resolve(imagePath), {recursive : true})
			}
		})
	}

	async createTemplate(item, dirPath, temPath, { layoutCompile, pageCompile }) {
		fs.mkdirSync(dirPath, { recursive: true })
		// 使用 Handlebars 编译模板
		if(layoutCompile && !this.judgeFileExist('file', `${dirPath}/layout.tsx`)) {
			readSpinner.succeed(`${item}layout组件生成开始~~~`)
			let layoutFile
			const itemLayoutPath = `${temPath}/layouts${item}.tsx`
			if (this.judgeFileExist('file', itemLayoutPath)) {
				layoutFile = fs.readFileSync(path.resolve(itemLayoutPath), 'utf8')
			} else {
				layoutFile = fs.readFileSync(path.resolve(`${temPath}/layouts/default.tsx`), 'utf8')
			}
			let layout = handlebars.compile(layoutFile)
			if (layoutCompile) layout = layoutCompile(layout)
			fs.writeFileSync(`${dirPath}/layout.tsx`, layout, 'utf8')
			readSpinner.succeed(`生成layout组件: ${dirPath}/layout.tsx`)
		}

		if(pageCompile && !this.judgeFileExist('file', `${dirPath}/page.tsx`)) {
			readSpinner.succeed(`${item}page组件生成开始~~~`)
			let pageFile
			const itemPagePath = `${temPath}/pages${item}.tsx`
			if (this.judgeFileExist('file', itemPagePath)) {
				pageFile = fs.readFileSync(path.resolve(itemPagePath), 'utf8')
			} else {
				pageFile = fs.readFileSync(path.resolve(`${temPath}/pages/default.tsx`), 'utf8')
			}
			let page = handlebars.compile(pageFile)
			if (pageCompile) page = pageCompile(page)
			fs.writeFileSync(`${dirPath}/page.tsx`, page, 'utf8')
			readSpinner.succeed(`生成page组件: ${dirPath}/page.tsx`)
		}
	}

	async createMainLayoutPage(hashName) {
		this.createTemplate('/main', this.appPagePath, this.appTemplatePath, {
			layoutCompile: (content) => {
				return content({
					hashName: hashName,
				})
			},
			pageCompile: (content) => {
				return content({
					hashName: hashName,
				})
			}
		})
	}

	async createComponent(data) {
		const { routerList, hashName } = data
		const list = routerList
		// 先创建主界面layout和page
		await this.createMainLayoutPage(hashName)
		await Promise.all(
			list.map(async (item) => {
				const appPath = `${this.appPagePath}${item}`
				const pagePath = `${this.componentPath}${item}`
				if (!this.judgeFileExist('dir', appPath)) {
					this.createTemplate(item, appPath, this.appTemplatePath, {
						layoutCompile: (content) => {
							const layoutName = _.capitalize(item.substring(1).split('-')[0])
							return content({
								item,
								componentPath: this.componentPath,
								name: this.appName,
								appName: `'${this.appName}'`,
								componentName: `${_.capitalize(hashName)}${layoutName}Layout`
							})
						},
						pageCompile: (content) => {
							const pageName = _.capitalize(item.substring(1).split('-')[0])
							return content({
								item,
								componentPath: this.componentPath,
								name: this.appName,
								appName: `'${this.appName}'`,
								componentName: `${_.capitalize(hashName)}${pageName}Page`
							})
						}
					})
				}

				if (!this.judgeFileExist('dir', pagePath)) {
					this.createTemplate(item, pagePath, this.pageTemplatePath, {
						pageCompile: (content) => {
							const pageName = _.capitalize(item.substring(1).split('-')[0])
							return content({
								item,
								componentName: `${_.capitalize(hashName)}${pageName}Page`
							})
						}
					})
				}
			})
		)
	}

	async start() {
		try {
			readSpinner.start()
			const hasConfig = this.judgeFileExist('file', this.configPath)
			if (!hasConfig) throw new Auxiliary().error(20002)
			const file = fs.readFileSync(path.resolve(this.configPath))
			const data = JSON.parse(file.toString())
			readSpinner.succeed('读取配置成功...')
			// 生成语言和主题配置
			await this.createLangTheme(data)
			// 生成图片文件夹
			await this.createImage(data)
			// 生成组件配置
			await this.createComponent(data)
			readSpinner.stop()
		} catch (error) {
			return readSpinner.fail(`${error}`)
		}
	}
}
