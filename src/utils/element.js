/**
 * 计算el-table的高度
 * @param {*} ref table的ref，用于获取元素
 * @returns
 */
export function resetTableHeight(ref) {
	// 浏览器总高度 - 表格元素到页面顶部的距离 - 分页组件的距离 - 两个内边距
	return window.innerHeight - getElementTopDis(ref.$el) - 62
}

/**
 * 获取元素到浏览器顶部距离
 * @param {*} className
 * @returns
 */
export function getElementTopDis(className) {
	let targetElement
	if (typeof className == 'string') {
		// 获取目标元素
		targetElement = document.querySelector(className)
	} else {
		targetElement = className
	}

	let distanceToTop

	const rect = targetElement.getBoundingClientRect()
	distanceToTop = rect.top

	return distanceToTop
}
