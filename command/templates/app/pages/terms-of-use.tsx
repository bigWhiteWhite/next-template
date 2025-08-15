import { {{componentName}} } from '@/{{componentPath}}{{item}}/page'
import { getWebPageContent } from '@/lib/apis'
import 'core-js/stable'
import { NextPage } from 'next'
import 'regenerator-runtime/runtime'

const Page: NextPage<PAGE.PageProps> = async ({ ...props }) => {
	// const res = await getWebPageContent({ locale: props.params.locale, pageType: 'termUse' })
	return <{{componentName}} {...props} message={''}></{{componentName}}>
}

export default Page
