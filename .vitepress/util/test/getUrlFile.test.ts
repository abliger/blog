
// 测试 getUrlFile 函数
import { filesToSidebar, getUrlFile } from '../getUrlFile.ts';
import type { DefaultTheme } from 'vitepress/theme';
const files = getUrlFile('./doc/java', ["md"]);

type SidebarItem = DefaultTheme.SidebarItem


let c = await filesToSidebar(files)
console.log(c);