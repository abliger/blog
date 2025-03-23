import * as fs from 'fs';
import * as path from 'path';
type Files = { name: string, isFile: boolean }[]
import type { DefaultTheme } from 'vitepress/theme'
interface FileStructure {
    [key: string]: string[] | FileStructure
}
/**
 * 获取指定目录下的所有文件路径
 * @param dir 目录路径
 * @param srcExclude 排除的文件路径
 * @returns 文件路径数组
 */
export function getUrlFile(dir: string, fileType: string[] = [], srcExclude: string[] = []): FileStructure {
    let srcExcludeReg = srcExclude.map((exclude) => {
        return new RegExp(exclude.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
    })
    let fileTypeReg = fileType.map((type) => {
        return new RegExp(`.*\.${type}$`)
    })
    let files = readDirSync(dir)
    let res = {}
    let file = files.shift() as { name: string, isFile: boolean } | undefined
    while (file) {
        if (file.isFile) {
            if (fileTypeReg.some(reg => reg.test(file!.name)) && !srcExcludeReg.some((reg) => reg.test(file!.name))) {
                if (res['index']) {
                    res['index'].push(shifeFirstD(file.name))
                } else {
                    res['index'] = [shifeFirstD(file.name)]
                }
            }

        } else {
            let files = getUrlFile(file.name, fileType, srcExclude)
            if (Object.keys(files).length) {
                res[getDirName(file.name)] = files
            }
        }

        file = files.shift()
    }

    return res
}


type SidebarItem = DefaultTheme.SidebarItem
/**
 * files 转换成 sidebar
 * @param files 
 * @returns 
 */
export async function filesToSidebar(files: Object): Promise<SidebarItem[]> {
    let sidebar: SidebarItem[] = []
    for (let key in files) {
        if (key === 'index') {
            continue
        }
        let item: SidebarItem = {
            text: key,
            link: files[key]['index'].length > 1 ? undefined : encodeURI(files[key]['index'][0]),
            collapsed: true,
            items: []
        }
        if (files[key]['index'].length > 1) {
            files[key]['index'].forEach((key) => {
                item.items!.push({
                    text: getFileName(key),
                    link: encodeURI(key)
                })
            })
            sidebar.push(item)
            continue
        }

        if (Object.keys(files[key]).length) {
            item.items = await filesToSidebar(files[key])
        }
        sidebar.push(item)
    }
    return sidebar
}
// 获得文件名
function getFileName(dir: string): string {
    return dir.split('/').pop()?.split('.').shift() as string
}

//获得当前目录的名字
function getDirName(dir: string): string {
    return dir.split('/').pop() as string
}

function shifeFirstD(dir: string): string {
    let temp = dir.split('/')
    temp.shift()
    return temp.join('/')
}
function readDirSync(dir: string): Files {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    return files.map(file => ({
        name: path.join(dir, file.name),
        isFile: file.isFile()
    }));
}
