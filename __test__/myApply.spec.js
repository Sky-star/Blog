import { describe, it, expect } from "vitest"
import { apply2 } from "../JS/myApply"

describe("myApply函数测试", () => {
	it("改变this指向", () => {
		const obj = {
			value: 1
		}

		function foo() {
			return this.value
		}

		const result = foo.apply2(obj)

		expect(result).toBe(1)
	})

	it("给定参数执行函数", () => {
		const obj = {
			value: 1
		}

		function foo(name, age) {
			return {
				name,
				age
			}
		}

		const { name, age } = foo.apply2(obj, [1, 2])

		expect(name).toBe(1)
		expect(age).toBe(2)
	})
})
