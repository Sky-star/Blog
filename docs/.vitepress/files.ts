import fs from "fs"
import path from 'path';

// 笔记所存的名称
const srcName = 'blog'

type Sidebar = SidebarItem[] | SidebarMulti

interface SidebarMulti {
	[path: string]: SidebarItem[]
}

type SidebarItem = {
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


// excludeFile is an array of strings that lists files to be excluded.
const excludeFile: string[] = ['index.md', 'assets']

function parseDirectory(directory: string, result: Sidebar = {}, exclude = excludeFile) {
	// 读取目录中的所有文件和文件夹
	const files = fs.readdirSync(directory).filter((name) => {
		return exclude.indexOf(name) === -1
	});

	// 对读取的文件进行排序
	sortFiles(files)

	// 遍历所有文件和子目录
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const filePath = path.join(directory, file);
		// 获取相对路径，否则vitepress不识别
		const relativePath = replaceRootDir(filePath)

		// 判断文件类型，如果是目录则递归解析子目录，否则将文件名添加到结果对象中
		if (fs.statSync(filePath).isDirectory()) {
			result[relativePath] = [{
				text: file,
				items: []
			}]

			parseDirectory(filePath, result);
		} else if (path.extname(file) === '.md') {
			const fileName = path.parse(filePath).name
			const dirPath = replaceRootDir(directory)
			const item: SidebarItem = {
				text: fileName,
				link: relativePath
			}

			result[dirPath][0].items.push(item)
		}
	}

	return result;
}

function replaceRootDir(path: string) {
	// 匹配docs/blog之后的文件路径
	const regex = new RegExp('[\\\\/]{1}' + srcName + '(.+?)(?:\\.md)?$', 'g');

	const match = regex.exec(path)

	if (match && match[1]) {
		return match[1].split('\\').join('/');
	} else {
		return '';
	}
}

function sortFiles(files: string[]) {
	files.sort(function (a: string, b: string) {
		const aIndex = parseInt(a.split('.')[0]);
		const bIndex = parseInt(b.split('.')[0]);
		return aIndex - bIndex;
	});
}


// 解析当前目录中的所有.md文件
export const files = parseDirectory('./docs/' + srcName)