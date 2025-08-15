import { AnimateProvider } from '@/components/AnimateProvider'
import { GlobalFooter } from '@/components/global-footer'
import { GlobalHeader } from '@/components/global-header'
import '@/theme/index.css'
import { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

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

export default function GlobalLayout({ children, params }: PAGE.LayoutProps) {
	const { locale } = params
	const messages = useMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<ThemeProvider
					themes={['light', 'dark']}
					attribute="class"
					defaultTheme={'system'}
					enableSystem
				>
					<NextIntlClientProvider
						locale={locale}
						messages={messages}
					>
						{/* <AnimateProvider> */}
							<GlobalHeader locale={locale}></GlobalHeader>
							<div className="min-h-screen overflow-hidden">{children}</div>
							<GlobalFooter locale={locale}></GlobalFooter>
						{/* </AnimateProvider> */}
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
