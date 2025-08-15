import { {{componentName}} } from '@/{{componentPath}}{{item}}/page'
import { getWebPageContent } from '@/lib/apis'
import 'core-js/stable'
import { NextPage } from 'next'
import 'regenerator-runtime/runtime'

const Page: NextPage<PAGE.PageProps> = async ({ ...props }) => {
	// const permissionRes = await getWebPageContent({ locale: props.params.locale, pageType: 'permission' })
	// const privacyPolicyRes = await getWebPageContent({ locale: props.params.locale, pageType: 'privacyPolicy' })

	return (
		<{{componentName}}
			{...props}
			privacyPolicyMes={''}
			permissionMes={''}
		></{{componentName}}>
	)
}

export default Page
