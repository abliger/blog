/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from 'fs'
import * as path from 'path'
type Files = { name: string; isFile: boolean }[]
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
export function getUrlFile(
    dir: string,
    fileType: string[] = [],
    srcExclude: string[] = [],
): FileStructure {
    const srcExcludeReg = srcExclude.map(exclude => {
        return new RegExp(
            exclude.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'),
        )
    })
    const fileTypeReg = fileType.map(type => {
        return new RegExp(`.*\.${type}$`)
    })
    const files = readDirSync(dir)
    const res = {}
    let file = files.shift() as { name: string; isFile: boolean } | undefined
    while (file) {
        if (srcExcludeReg.some(reg => reg.test(file!.name))) {
            file = files.shift()
            continue
        }
        if (file.isFile) {
            if (fileTypeReg.some(reg => reg.test(file!.name))) {
                if (res['index']) {
                    res['index'].push(shiftFirstD(file.name))
                } else {
                    res['index'] = [shiftFirstD(file.name)]
                }
            }
        } else {
            const files = getUrlFile(file.name, fileType, srcExclude)
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
export async function filesToSidebar(files: object): Promise<SidebarItem[]> {
    function temp(files: object): SidebarItem[] {
        const sidebar: SidebarItem[] = []

        for (const key in files) {
            if (key === 'index') {
                continue
            }

            const item: SidebarItem = {
                text: key,
                collapsed: true,
                items: [],
            }

            const fileMap = (files[key]['index'] as Array<string>)?.reduce(
                (acc, fileName) => {
                    if (fileName.endsWith('/index.md')) {
                        acc[0] = fileName
                    } else {
                        acc[1].push(fileName)
                    }
                    return acc
                },
                [null as any, [] as string[]],
            ) || [undefined, []]
            if (fileMap[0]) {
                item.link = '/' + fileMap[0].split('/index.md').shift() + '/'
            }
            fileMap[1].forEach(key => {
                item.items!.push({
                    text: getFileName(key),
                    link: '/' + key.replaceAll('.md', ''),
                })
            })
            if (
                Object.keys(files[key]).filter(item => item !== 'index')
                    .length > 0
            ) {
                item.items?.push(...temp(files[key]))
            }
            sidebar.push(item)
        }
        return sidebar
    }
    return temp(files)
}
// 获得文件名
function getFileName(dir: string): string {
    const fileName = dir.split('/').pop()?.split('.').shift() as string
    const t = /^\d+_(.*)/.exec(fileName)
    return t ? t[1] : fileName
}

//获得当前目录的名字
function getDirName(dir: string): string {
    return dir.split('/').pop() as string
}

function shiftFirstD(dir: string): string {
    const temp = dir.split('/')
    temp.shift()
    return temp.join('/')
}
function readDirSync(dir: string): Files {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    return files.map(file => ({
        name: path.join(dir, file.name),
        isFile: file.isFile(),
    }))
}
