import type { DefaultTheme } from 'vitepress'
import { getSidebar } from './sidebar'

export async function getArchive(): Promise<DefaultTheme.SidebarItem[]> {
    return [
        {
            text: '基础',
            link: '/base/',
            items: await getSidebar('base'),
            collapsed: false,
        },
        {
            text: '前端',
            link: '/frontEnd/',
            items: await getSidebar('frontEnd'),
            collapsed: false,
        },
        {
            text: 'JAVA',
            link: '/java/',
            items: await getSidebar('java'),
            collapsed: false,
        },
        {
            text: 'Linux',
            link: '/linux/',
            items: await getSidebar('linux'),
            collapsed: false,
        },
        {
            text: 'Docker',
            link: '/docker/',
            items: await getSidebar('docker'),
            collapsed: false,
        },
        {
            text: '设计模式',
            link: '/设计模式/',
            items: await getSidebar('设计模式'),
            collapsed: false,
        },
        {
            text: '编译原理',
            link: '/compiler_principles/',
            items: await getSidebar('compiler_principles'),
            collapsed: false,
        },
        {
            text: 'rust-book',
            link: '/rust-book/',
            items: await getSidebar('rust-book'),
            collapsed: false,
        },
        {
            text: '其他',
            link: '/other/',
            items: await getSidebar('other'),
            collapsed: false,
        },
    ]
}
