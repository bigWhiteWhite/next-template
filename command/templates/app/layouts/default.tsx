import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: PAGE.ParamsProps): Promise<Metadata> {
	unstable_setRequestLocale(locale)
	const t = await getTranslations({ locale })

	const defaultMeta: Metadata = {
		title: t('app.name'),
		description: t('app.description'),
		icons: [
			{
				rel: 'icon',
				url: `/favicon.ico`
			}
		]
	}
	return defaultMeta
}

export default async function Layout({ children, params }: PAGE.LayoutProps) {
	return children
}
