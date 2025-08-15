// import { getWebPageContent } from '@/lib/apis'
import 'core-js/stable'
import { NextPage } from 'next'
import 'regenerator-runtime/runtime'

const RootPage: NextPage<PAGE.ParamsProps> = async ({ ...props }) => {
	// const res = await getWebPageContent({ locale: props.params.locale, pageType: 'permission' })
	return <div>success</div>
}

export default RootPage
