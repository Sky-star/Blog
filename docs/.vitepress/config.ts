import { defineConfig } from 'vitepress';
import { files } from './files';
import { mathjax3, customElements } from './mathjax3';

// console.log(JSON.stringify(files, null, 2));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "老白的学习笔记",
  description: "JavaScript的学习记录",
  srcDir: './blog',
  lastUpdated: true,
  ignoreDeadLinks: true,
  base: '/Blog/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
    ],
    sidebar: files,
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sky-star/Interview' },
      { icon: 'github', link: 'https://github.com/mqyqingfeng/Blog' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      }
    }
  }

})
