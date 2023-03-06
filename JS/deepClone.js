export function deepClone(obj, hash = new WeakMap()) {
	// 如果对象为null或者undefined 则不进行拷贝操作
	if (obj === null) return obj
	if (obj instanceof Date) return new Date(obj)
	if (obj instanceof RegExp) return new RegExp(obj)

	// 如果非引用类型则不进行拷贝
	if (typeof obj !== "object") return obj

	// 这里用weak map 为了递归的是不用重复的拷贝引用对象 以及防止发生循环引用
	// 主要原因就可能存储自身属性引用了自身的情况 obj.target = obj
	if (hash.get(obj)) return hash.get(obj)

	// 创建克隆对象
	let cloneObj = new obj.constructor()

	// 将创建好的对象存入到 map 中
	hash.set(obj, cloneObj)

	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			// 进行递归拷贝
			cloneObj[key] = deepClone(obj[key], hash)
		}
	}

	return cloneObj
}
