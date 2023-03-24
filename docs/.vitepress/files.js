import fs from "fs"

export default {
	paths() {
		return fs.readdirSync("../笔记").map((dir) => {
			return { text: dirname }
		})
	}
}
// const dirs = fs.readdirSync("../笔记").map((dirname) => {
// 	return { text: dirname }
// })

// console.log(arr)
