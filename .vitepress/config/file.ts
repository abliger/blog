import fs from 'fs'
import path from 'path'

/**
 * 文件系统抽象对象
 */
export class FileObject {
    isDir: boolean
    path: string
    name: string
    includes?: FileObject[]
    constructor(
        isDir: boolean,
        path: string,
        name: string,
        includes?: FileObject[],
    ) {
        this.isDir = isDir
        this.path = path
        this.name = name
        this.includes = includes
    }
}

/**
 * 根据路径获得文件对象
 * @param realPath 目录
 * @param ignore 忽略正则
 */
export function getDirAllObjects(
    realPath: string,
    ignore?: string[],
): FileObject {
    if (isIgnoredPath(realPath, ignore)) {
        return undefined
    }
    const stats = getFileStats(realPath)

    if (stats.isFile()) {
        docFileinfo.saveFileInfo(realPath, stats)
        return new FileObject(false, realPath, path.basename(realPath))
    }

    const fileObjectList = fs
        .readdirSync(realPath)
        .map(k => getDirAllObjects(path.resolve(realPath, k), ignore))
        .filter(v => v)
        .sort((a, b) => sortFile(a, b))
    return new FileObject(
        true,
        realPath,
        path.basename(realPath),
        fileObjectList.length > 0 ? fileObjectList : undefined,
    )
}

/**
 * 获取文件状态信息，处理异常
 */
function getFileStats(realPath: string): fs.Stats {
    try {
        return fs.statSync(realPath)
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * 检查路径是否应该被忽略
 * 只匹配文件/目录名，避免项目所在路径中的子串误匹配
 */
function isIgnoredPath(realPath: string, ignore?: string[]): boolean {
    if (!ignore || ignore.length === 0) {
        return false
    }

    const name = path.basename(realPath)
    return ignore.some(exclude => new RegExp(exclude).test(name))
}

/**
 * 排序方法,让文件夹排在后面
 */
function sortFile(a: FileObject, b: FileObject): number {
    if (a.isDir !== b.isDir) {
        return a.isDir ? 1 : -1
    }
    return 0
}

export type info = {
    ctime: Date
    mtime: Date
    path: string
}
class FileInfo {
    fileInfoList = new Array<info>()

    saveFileInfo = (path: string, stats: fs.Stats) => {
        this.fileInfoList.push({
            ctime: stats.ctime,
            mtime: stats.mtime,
            path,
        })
        return this
    }
}
function getLastFile(fileInfo: info[], number: number) {
    return [...fileInfo]
        .sort((a, b) => b.ctime.getTime() - a.ctime.getTime()) // 按创建时间降序
        .slice(0, number) // 取前number个
}

export const docFileinfo = new FileInfo()

export const fileInfos = () => {
    const t = { daily: [], other: [] }
    const gre = /.*\/daily\//
    docFileinfo.fileInfoList.forEach(v => {
        if (gre.test(v.path)) {
            t['daily'].push(v)
            return
        }
        t['other'].push(v)
    })
    return {
        daily: getLastFile(t.daily, 20).map(v => {
            return {
                path: v.path,
                ctime: v.ctime.toLocaleString(),
                mtime: v.mtime.toLocaleString(),
            }
        }),
        other: getLastFile(t.other, 20).map(v => {
            return {
                path: v.path,
                ctime: v.ctime.toLocaleString(),
                mtime: v.mtime.toLocaleString(),
            }
        }),
    }
}
