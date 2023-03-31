function sub_curry(fn) {
	var args = [].slice.call(arguments, 1)
	return function () {
		return fn.apply(this, args.concat([].slice.call(arguments)))
	}
}

function curry(fn, length) {
	// 获取函数参数长度
	length = length || fn.length

	var slice = Array.prototype.slice

	return function () {
		// 判断执行函数时传入的参数长度是否小于 fn 定义的形参长度
		if (arguments.length < length) {
			var combined = [fn].concat(slice.call(arguments))
			return curry(sub_curry.apply(this, combined), length - arguments.length)
		}
		// 当陆续传入的参数与fn定义的形参长度相同时，执行函数
		else {
			return fn.apply(this, arguments)
		}
	}
}

var fn0 = function (a, b, c) {
	return [a, b, c]
}

var fn = curry(fn0)

console.log(fn.toString())

console.log(fn("a")("b").toString())

// fn("a", "b", "c") // ["a", "b", "c"]
// fn("a", "b")("c") // ["a", "b", "c"]
// fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]
