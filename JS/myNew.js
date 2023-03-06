function myNew(Func, ...args) {
	// 第一步 创建一个空对象
	const obj = {}
	// 第二步 将空对象的原型指向构造函数的对象对象上
	obj.__proto__ = Func.prototype
	// 第三步 绑定构造函数的 this 指向
	let result = Func.apply(obj, args)
	// 第四步 构造函数的返回类型确定最终要返回的值
	return result instanceof Object ? result : obj
}
