import { {{componentName}} } from '@/{{componentPath}}{{item}}/page'
import 'core-js/stable'
import { NextPage } from 'next'
import 'regenerator-runtime/runtime'

const Page: NextPage<PAGE.PageProps> = async ({ ...props }) => {
	return <{{componentName}} {...props}></{{componentName}}>
}

export default Page

