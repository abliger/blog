import type { DefaultTheme } from 'vitepress'
import { filesToSidebar, getUrlFile } from '../util/getUrlFile'
import * as fs from 'fs'
import * as path from 'path'

async function getArchieve() {
    const filedir = getFileDir()
    return Promise.all([
        {
            text: "基础",
            link: "/base/",
            items: await filesToSidebar(filedir['base']),
            collapsed: false
        }, {
            text: "前端",
            link: "/frontEnd/",
            items: await filesToSidebar(filedir['frontEnd']),
            collapsed: false
        }, {
            text: "JAVA",
            link: "/java/",
            items: await filesToSidebar(filedir['java']),
            collapsed: false
        }, {
            text: "Linux",
            link: "/linux/",
            items: await filesToSidebar(filedir['linux']),
            collapsed: false
        },
        {
            text: "Docker",
            link: "/docker/",
            items: await filesToSidebar(filedir['docker']),
            collapsed: false
        },
        {
            text: "设计模式",
            link: "/设计模式/",
            items: await filesToSidebar(filedir['设计模式']),
            collapsed: false
        },
        {
            text: "rust-book",
            link: "/rust-book/",
            items: await filesToSidebar(filedir['rust']),
            collapsed: false
        },
        {
            text: "其他",
            link: "/other/",
            items: await filesToSidebar(filedir['other']),
            collapsed: false
        }
    ] as DefaultTheme.SidebarItem[])
}

const archieve = await getArchieve();

// export const archiveDir: DefaultTheme.Sidebar = getArchieveDir()

export function getArchieveDir() {
    const a = {}
    archieve.forEach(item => {
        a[item.link!] = archieve
    })

    // 导出归档文件夹的路径 
    const archiveDir: DefaultTheme.Sidebar = {
        "/achieve": archieve,
        ...a
    }
    return archiveDir
}
export const archieveDir = getArchieveDir();
function getFileDir() {
    let base = getUrlFile('./doc/base', ['md'], ['**/code/**', "**/node_modules"])
    let frontEnd = getUrlFile('./doc/frontEnd', ['md'], ["**/node_modules"])
    let java = getUrlFile('./doc/java', ['md'], ["**/node_modules"])
    let linux = getUrlFile('./doc/linux', ['md'], ["**/node_modules"])
    let docker = getUrlFile('./doc/docker', ['md'], ["**/node_modules"])
    let design = getUrlFile('./doc/设计模式', ['md'], ["**/node_modules"])
    let rust = getUrlFile('./doc/rust-book', ['md'], ["**/node_modules"])
    let other = getUrlFile('./doc/other', ['md'], ["**/node_modules"])

    const filedir = {
        base,
        frontEnd,
        java,
        linux,
        docker,
        "设计模式": design,
        rust,
        other
    }
    return filedir
}

function getFiles(filedir) {
    let temp: string[] = []

    function t(filedir) {
        if (filedir.index) {
            temp.push(...filedir.index)
        }
        let k = Object.keys(filedir).filter(i => i !== 'index')
        let list = k.map(item => filedir[item])
        list.forEach(item => {
            t(item)
        })
    }
    t(filedir)
    return temp
}
export const dir = getFiles(getFileDir())
export function getDir() {
    return getFiles(getFileDir())
}

function getFileNameByNextOrPrev(str: string): string {
    let sp = str.split('/')
    let filename = sp.pop()
    let name = filename?.split(".").shift()
    if (name === 'index') {
        return sp.pop()!
    }
    return name!
}

export function getFileURLToNextOrPrev(path: string): Record<string, any> {
    if (!Object.keys(archieveDir).some(item => new RegExp(`.*${item}/`).test('/' + path))) {
        return {}
    }
    const getNavItem = function (path: string) {
        return path && {
            text: getFileNameByNextOrPrev(path),
            link: path
        }
    }

    const index = dir.indexOf(path);
    const hasPrev = index > 0;
    const hasNext = index < dir.length - 1 && index !== -1;

    return {
        ...(hasPrev && { prev: getNavItem(dir[index - 1]) }),
        ...(hasNext && { next: getNavItem(dir[index + 1]) })
    };
}
function getLastEditFile(dir: string[], size: number): string[] {
    const filesWithTime = dir.map(file => {
        try {
            const filePath = path.resolve('/doc/' + file)
            const stats = fs.statSync(filePath)
            return {
                file,
                mtime: stats.mtime.getTime()
            }
        } catch (e) {

            return {
                file,
                mtime: 0
            }
        }
    })
    return filesWithTime
        .sort((a, b) => b.mtime - a.mtime)
        .slice(0, size)
        .map(f => f.file)
}

// 时间计算模块
const getTimeAgo = (unit: 'month' | 'week', value: number): Date => {
    const date = new Date();
    const method = unit === 'month' ? 'Month' : 'Date';
    date[`set${method}`](date[`get${method}`]() - value);
    return date;
};

// 文件过滤核心逻辑
const filterFilesByMtime = (dir: string[], thresholdDate: Date): number => {
    return dir.filter(async file => {
        try {
            const stats = await fs.promises.stat(path.resolve('doc', file));
            return stats.mtime > thresholdDate;
        } catch (e) {
            console.error(`File check error: ${file}`, e);
            return false;
        }
    }).length;
};

// 统一查询接口
const getUpdatedFilesCount = (dir: string[], timeUnit: 'month' | 'week'): number => {
    const threshold = getTimeAgo(timeUnit, timeUnit === 'month' ? 1 : 7);
    return filterFilesByMtime(dir, threshold);
};

/**
 * 获取指定目录下最近编辑的文件。
 *
 * @param size - 要获取的文件数量。
 * @returns 最近编辑的文件数组。
 */
export const lastFiles = (size: number) => getLastEditFile(dir, size)
export const fileTotal = dir.length
export const getMonthlyUpdates = getUpdatedFilesCount(dir, 'month');
export const getWeeklyUpdates = getUpdatedFilesCount(dir, 'week');