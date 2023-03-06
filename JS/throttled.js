// n秒内只执行一次， 若在n秒内重复触发 只有一次生效
function throttled(fn, delay = 500) {
	// 定时器
	let timer = null
	// 开始的时间
	let startTime = Date.now()

	return function () {
		// 当前时间
		let currentTime = Date.now()
		// 剩余时间
		let remaining = delay - (currentTime - startTime)
		console.log(remaining)
		// 上下文对象
		let context = this
		// 传参
		let args = arguments
		// 重复触发则清除定时器
		clearTimeout(timer)
		// 到时执行函数
		if (remaining <= 0) {
			fn.apply(context, args)
			startTime = Date.now()
		} else {
			// 重新定义定时器
			timer = setTimeout(fn, remaining)
		}
	}
}

let value = 1

function addValue() {
	value = 2
	console.log("我被触发了")
	console.log("----------")
}

const resultFn = throttle(addValue, 1000)
console.log(resultFn)

setInterval(resultFn, 100)
