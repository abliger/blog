import type { DefaultTheme } from 'vitepress'
import { getSidebar } from '../util/getUrlFile'
const archieve = [{
    text: "Java",
    link: "/java/",
    items: await getSidebar('./doc/java'),
    collapsed: false
}, {
    text: "Linux",
    link: "/linux/",
    items: await getSidebar('./doc/linux'),
    collapsed: false
},
{
    text: "Docker",
    link: "/docker/",
    items: await getSidebar('./doc/docker'),
    collapsed: false
},
{
    text: "设计模式",
    link: "/设计模式/",
    items: await getSidebar('./doc/设计模式'),
    collapsed: false
}] as DefaultTheme.SidebarItem[]
// 导出归档文件夹的路径 
export const archiveDir: DefaultTheme.Sidebar = {
    "/achieve": archieve,
    "/java": archieve,
    "/linux": archieve,
    "/docker": archieve,
    "/设计模式": archieve
} 