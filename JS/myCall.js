Function.prototype.call2 = function (context) {
	if (context == undefined || context == null) context = window

	if (typeof context !== "object") context = Object(context)

	const fnName = Symbol()

	// 将函数添加为对象的属性, 为了防止覆盖同名属性
	context[fnName] = this

	// 取参数
	const args = [...arguments].slice(1)

	// 执行函数
	let result = context[fnName](...args)

	// 删除函数
	delete context[fnName]

	// 返回函数
	return result
}
