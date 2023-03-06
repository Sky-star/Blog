// 函数缓存 主要通过闭包，柯里化, 高阶函数来实现
// 利用了闭包函数能够访问内部函数之外的属性来实现
function memoize(func, content) {
	let cache = Object.create(null)
	content = content || this
	return (...key) => {
		if (!cache[key]) {
			cache[key] = func.apply(content, key)
		}
		return cache[key]
	}
}

function add(a, b) {
	return a + b
}

const calc = memoize(add)

// 这么调用实际上是在window上挂载了缓存的数据
calc(100, 200)
calc(100, 200)
