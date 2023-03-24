import { defineConfig } from 'vitepress';
import { files } from './files';

console.log(files)
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "老白的学习笔记",
  description: "JavaScript的学习记录",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sky-star/Interview' },
      { icon: 'github', link: 'https://github.com/mqyqingfeng/Blog' }
    ]
  }
})
