'use client'

import { NextPage } from 'next'
import { useTranslations } from 'next-intl'

export const {{componentName}}: NextPage<PAGE.PageProps> = async ({ privacyPolicyMes, permissionMes }) => {
	const t = useTranslations()
	return (
		<>
			<div>当前语言{t('locales.en')}</div>
			<div>当前界面 - {{item}}</div>
		</>
	)
}
