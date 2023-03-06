import { describe, it, expect } from "vitest"
import { myBind } from "./myBind"

describe("Bind", () => {
	it("绑定函数作为普通函数使用时", () => {
		const foo = {
			value: 1
		}

		function bar(name, age) {
			this.habit = "shopping"
			return { value: this.value, name, age }
		}

		const bindFoo = bar.myBind(foo, "daisy")
		const result = bindFoo(18)

		expect(result.value).toBe(1)
		expect(result.name).toBe("daisy")
		expect(result.age).toBe(18)
	})

	it("当绑定函数作为构造函数使用时, 绑定的this指针失效, 但是传参仍然有效", () => {
		const foo = {
			value: 1
		}

		function bar(name, age) {
			this.habit = "shopping"
			return { value: this.value, name, age }
		}
		const bindFoo = bar.myBind(foo, "daisy")
		const obj = new bindFoo(18)

		expect(obj.value).toBe(undefined)
		expect(obj.name).toBe("daisy")
		expect(obj.age).toBe(18)
	})

	it("绑定函数能够访问原函数上的原型属性", () => {
		const foo = {
			value: 1
		}

		function bar(name, age) {
			this.habit = "shopping"
			return { value: this.value, name, age }
		}

		bar.prototype.friend = "kevin"
		const bindFoo = bar.myBind(foo, "daisy")

		expect(bindFoo.prototype.friend).toBe("kevin")
	})

	it("绑定函数的原型不应修改原函数的原型属性", () => {
		const foo = {
			value: 1
		}

		function bar(name, age) {
			this.habit = "shopping"
			return { value: this.value, name, age }
		}

		bar.prototype.friend = "kevin"

		const bindFoo = bar.myBind(foo, "daisy")

		bindFoo.prototype.home = "x"

		expect(bar.prototype.home).toBe(undefined)
	})
})
