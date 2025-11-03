import { DefaultTheme } from 'vitepress/theme'
import { docSidebar, dailySidebar } from './route'
import { fileInfos } from './file'
import { info } from './init'

const myOption = {
    dailySidebar,
    fileInfo: fileInfos(),
    ...info,
}

const themeConfig: DefaultTheme.Config = {
    ...myOption,
    outline: {
        level: [2, 6],
        label: '页面导航',
    },
    sidebar: docSidebar,
    nav: [
        {
            text: '归档',
            link: '/achieve',
            activeMatch: docSidebar.map(item => '^' + item.link).join('|'),
        },
        { text: '关于', link: '/about', target: '_self' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/abliger/blog' }],
    search: {
        provider: 'local',
        options: {
            locales: {
                root: {
                    translations: {
                        button: {
                            buttonText: '搜索',
                            buttonAriaLabel: '搜索文档',
                        },
                        modal: {
                            backButtonTitle: '关闭搜索',
                            resetButtonTitle: '重置搜索',
                            displayDetails: '显示详细列表',
                            footer: {
                                selectText: '选择',
                                selectKeyAriaLabel: '输入',
                                navigateText: '导航',
                                navigateUpKeyAriaLabel: '上箭头',
                                navigateDownKeyAriaLabel: '下箭头',
                                closeText: '关闭',
                                closeKeyAriaLabel: 'esc',
                            },
                            noResultsText: '无法找到相关结果',
                        },
                    },
                },
            },
        },
    },
    docFooter: {
        prev: '上一页',
        next: '下一页',
    },
    lastUpdated: {
        text: '最后更新于',
        formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium',
        },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
}

export default themeConfig
