import fs from 'fs';
import path from 'path';

// 由于不能从第三方库中导出这个类型，所以复制了一份出来
export type Sidebar = SidebarItem[] | SidebarMulti

export interface SidebarMulti {
	[path: string]: SidebarItem[]
}

export type SidebarItem = {
	/**
	 * The text label of the item.
	 */
	text?: string

	/**
	 * The link of the item.
	 */
	link?: string

	/**
	 * The children of the item.
	 */
	items?: SidebarItem[]

	/**
	 * If not specified, group is not collapsible.
	 *
	 * If `true`, group is collapsible and collapsed by default
	 *
	 * If `false`, group is collapsible but expanded by default
	 */
	collapsed?: boolean
}

function parseDirectory(directory: string) {
	// 读取目录中的所有文件和文件夹
	const files = fs.readdirSync(directory);
	const result: Sidebar = {}
	// 遍历所有文件和子目录
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const filePath = path.join(directory, file);
		// 判断文件类型，如果是目录则递归解析子目录，否则将文件名添加到结果对象中
		if (fs.statSync(filePath).isDirectory()) {
			const childDirectory = parseDirectory(filePath);
			result[filePath].push({
				text: file,
				items: []
			})
		} else if (path.extname(file) === '.md') {

		}
	}


	return result;
}

// 解析当前目录中的所有文件和子目录
export const files = parseDirectory('./docs/笔记');

// 输出结果
console.log(files);
