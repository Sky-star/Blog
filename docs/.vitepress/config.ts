import { defineConfig } from 'vitepress';
import { files } from './files';


console.log(JSON.stringify(files, null, 2));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "老白的学习笔记",
  description: "JavaScript的学习记录",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '笔记/JavaScript专题系列/节流', activeMatch: '笔记/JavaScript专题系列' }
    ],

    sidebar: files,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sky-star/Interview' },
      { icon: 'github', link: 'https://github.com/mqyqingfeng/Blog' }
    ]
  }
})
