/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				tagName: '#318CF9', // 选择框tag字体颜色
			},
		},
	},
	plugins: [],
}
