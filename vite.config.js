import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function pathResolve(dir) {
	return resolve(process.cwd(), '.', dir)
}

const images = pathResolve('src/assets/images/')

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
	return {
		// vite 配置
		base: './',
		plugins: [vue(), require('tailwindcss'), require('autoprefixer')],
		resolve: {
			alias: [
				{
					find: /\/@\//,
					replacement: pathResolve('src') + '/',
				},
				{
					find: /\/images\//,
					replacement: 'src/assets/images/',
				},
			],
		},
		server: {
			host: '0.0.0.0',
			port: 5173,
			proxy: {
				'/Api': {
					target: 'http://192.168.16.154:8005',
					changeOrigin: true,
				},
			},
		},
	}
})
