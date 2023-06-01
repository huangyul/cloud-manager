import { defineStore } from 'pinia'

export const useBasicStore = defineStore({
	id: 'basic',
	state: () => {
		return {
			tableHeight: 0,
			tableRef: null,
		}
	},
	getters: {},
	actions: {},
})
