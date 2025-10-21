
// 测试 getUrlFile 函数
import { filesToSidebar, getUrlFile } from '../getUrlFile';
import type { DefaultTheme } from 'vitepress/theme';
const files = getUrlFile('./doc/other', ["md"],["**/node_modules"]);

type SidebarItem = DefaultTheme.SidebarItem


let c = await filesToSidebar(files)
console.log(c);