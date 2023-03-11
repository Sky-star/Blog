Function.prototype.apply2 = function (context, arr) {
	if (context == null) context = window
	if (typeof context !== "object") context = Object(context)

	const fnName = Symbol()

	context[fnName] = this

	let result

	if (!arr) {
		result = context[fnName]()
	} else {
		result = context[fnName](...arr)
	}

	delete context[fnName]

	return result
}
