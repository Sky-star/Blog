Function.prototype.myBind = function (context) {
	// 判断调用对象是否为函数
	if (typeof this !== "function") {
		throw new TypeError("error")
	}

	// 获取myBind 传入的参数
	const args = [...arguments].slice(1)
	const fn = this
	const fNOP = function () {}

	var Fn = function () {
		// 根据调用方式，传入不同绑定值
		// 这里谁调用fn就是谁，从下面的例子来看就是testFn并改变this指向
		// 当绑定函数也就是Fn作为构造函数使用时，需要调用自身的fn的构造函数并且换回,this也会指向一个新的对象
		// 当绑定函数作为普通函数使用时则将传入进来的对象context进行绑定
		// 分割线
		// 需要注意的是，这个Fn函数中的arguments和上面的arguments不是一个
		// 第一个arguments testFn.myBind(obj, 1)， 里面的这个 1
		// 第二个arguments bindFn(1,2,3)中的 1,2,3
		return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments))
	}

	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
	// Fn.prototype = this.prototype 缺点: 如果直接这么写会导致 如果修改返回函数的prototype，也会修改绑定函数的prototype

	// 这里用个空函数进行中转，防止出现问题
	fNOP.prototype = this.prototype
	// 这里利用了new函数里面创建新对象指向fNOP的prototype obj.__proto___ = fNOP.prototype
	// 因为是新建的，不会修改原函数的prototype
	Fn.prototype = new fNOP()
	return Fn
}
