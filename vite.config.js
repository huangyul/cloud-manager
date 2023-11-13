import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'

function pathResolve(dir) {
	return resolve(process.cwd(), '.', dir)
}

const images = pathResolve('src/assets/images/')

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
	return {
		// vite 配置
		base: './',
		plugins: [vue(), UnoCSS()],
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
			port: 5175,
			proxy: {
				'/Api': {
					target: 'http://192.168.16.154:8006',
					changeOrigin: true,
				},
				'/cloudstoreservice': {
					target: 'http://47.100.7.173:9013',
					changeOrigin: true,
				},
			},
		},
	}
})
