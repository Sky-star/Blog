import { describe, it, expect } from "vitest"
import { deepClone } from "./deepClone"

describe("deepClone", () => {
	it("普通对象的克隆", () => {
		const target = {
			field1: 1,
			field2: undefined,
			field3: "ConardLi",
			field4: {
				child: "child",
				child2: {
					child2: "child2"
				}
			}
		}

		const cloneObj = deepClone(target)

		expect(cloneObj).not.toBe(target)
		expect(cloneObj).toStrictEqual(target)
	})

	it("包含数组的对象的克隆", () => {
		const target = {
			field1: 1,
			field2: undefined,
			field3: "ConardLi",
			field4: [2, 3, 4]
		}

		const cloneObj = deepClone(target)

		expect(cloneObj).not.toBe(target)
		expect(cloneObj).toStrictEqual(target)
	})

	it("循环引用问题", () => {
		const target = {
			field1: 1,
			field2: undefined,
			field3: {
				child: "child"
			},
			field4: [2, 4, 8]
		}
		target.target = target

		const cloneObj = deepClone(target)

		expect(cloneObj).not.toBe(target)
		expect(cloneObj).toStrictEqual(target)
	})
})
