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
 */
function isIgnoredPath(realPath: string, ignore?: string[]): boolean {
    if (!ignore || ignore.length === 0) {
        return false
    }

    return ignore.some(exclude => new RegExp(exclude).test(realPath))
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

// // 时间计算模块
// const getTimeAgo = (unit: 'month' | 'week', value: number): Date => {
//     const date = new Date()
//     const method = unit === 'month' ? 'Month' : 'Date'
//     date[`set${method}`](date[`get${method}`]() - value)
//     return date
// }

// // 文件过滤核心逻辑
// const filterFilesByMtime = (dir: string[], thresholdDate: Date): number => {
//     return dir.filter(async file => {
//         try {
//             const stats = await fs.promises.stat(path.resolve('doc', file))
//             return stats.mtime > thresholdDate
//         } catch (e) {
//             console.error(`File check error: ${file}`, e)
//             return false
//         }
//     }).length
// }

// // 统一查询接口
// const getUpdatedFilesCount = (
//     dir: string[],
//     timeUnit: 'month' | 'week',
// ): number => {
//     const threshold = getTimeAgo(timeUnit, timeUnit === 'month' ? 1 : 7)
//     return filterFilesByMtime(dir, threshold)
// }
