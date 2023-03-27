import { describe, it, expect } from "vitest"
import { call2 } from "../JS/myCall"

describe("myCall函数测试", () => {
	it("改变this指向", () => {
		const obj = {
			value: 1
		}

		function foo() {
			return this.value
		}

		const result = foo.call2(obj)

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

		const { name, age } = foo.call2(obj, "kevin", "18")

		expect(name).toBe("kevin")
		expect(age).toBe("18")
	})
})
