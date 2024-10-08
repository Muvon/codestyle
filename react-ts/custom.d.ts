/* eslint-disable */

declare module '*.svg' {
	import React = require('react')
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	const content: any
	export default content
}

declare module '*.png' {
	const content: string
	export default content
}

declare module '*.gif' {
	const content: string
	export default content
}
declare module '*.jpg' {
	const content: string
	export default content
}

declare module '*.jpeg' {
	const content: string
	export default content
}

declare module '*.md' {
	const content: string
	export default string
}
