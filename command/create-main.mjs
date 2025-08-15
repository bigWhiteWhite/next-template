import inquirer from 'inquirer'
import { Auxiliary } from './auxiliary.mjs'
import { CreateApp } from './create-app.mjs'
const createApp = async (appName) => {
	const app = new CreateApp(appName)
	await app.start()
}
const main = async () => {
	// 选择app
	await inquirer
		.prompt([
			{
				type: 'input',
				name: 'appName',
				message: '接入新app,请输入appName(本脚本只做增加,不做修改删除功能)',
				validate: (value) => {
					return value ? Boolean(value) : new Auxiliary().error(20001)
				}
			}
		])
		.then(async ({ appName }) => {
			await createApp(appName)
		})
		.catch((error) => {
			console.log(`${new Auxiliary().error(20000)}: ${error}`)
		})
}
main()
