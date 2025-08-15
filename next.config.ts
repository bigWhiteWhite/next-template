import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
}
const withNextIntl = createNextIntlPlugin()
const nextApplication = withNextIntl(nextConfig)

if (process.env.NODE_ENV === 'development') {
	nextApplication.rewrites = async () => {
		console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
		// 去中间件排除对应路径
		return [
			// {
			// 	// 自身服务端接口
			// 	source: '/nextapi/:path*',
			// 	destination: 'http://127.0.0.1:7815/nextapi/:path*'
			// },
		]
	}
}
export default nextApplication
