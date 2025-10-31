import type { DefaultTheme } from 'vitepress'
import path from 'path'
import { getDirAllObjects, type FileObject } from './file'

export async function getSidebar(
    needParseChildPath: string,
    p: string = './doc',
): Promise<DefaultTheme.SidebarItem[]> {
    const basePath = path.resolve(p, needParseChildPath)
    const fileObjects = getDirAllObjects(
        basePath,
        (await import('./config')).default.ignoreFile,
    )
    if (needParseChildPath[0] !== '/') {
        needParseChildPath = '/' + needParseChildPath
    }
    function _SIDEBAR(
        _a: FileObject,
        basePath: string,
    ): DefaultTheme.SidebarItem[] {
        return !_a.isDir
            ? [
                  {
                      text: _a.name.split('.').shift(),
                      link: haveLink(_a, basePath, _a.name),
                      collapsed: true,
                  },
              ]
            : _a.includes.map(v => {
                  return {
                      text: v.name.split('.').shift(),
                      link: haveLink(v, basePath, v.name),
                      collapsed: true,
                      items: !v.isDir
                          ? undefined
                          : _SIDEBAR(v, [basePath, v.name].join('/')),
                  } as DefaultTheme.SidebarItem
              })
    }

    return fileObjects.includes
        .filter(v => v.name !== 'index.md')
        .map(v => {
            const link = haveLink(v, needParseChildPath, v.name)
            return {
                text: v.name.split('.').shift(),
                link,
                collapsed: true,
                items: !v.isDir
                    ? undefined
                    : _SIDEBAR(v, [needParseChildPath, v.name].join('/')),
            }
        })
}

/**
 * 是否应该有路由 如果有 index.md 文件夹链接直接指向 index.md ,否则指向同名文件.如果都没有则文件没有链接
 * @param path 路由对应文件对象
 * @returns link 路由地址
 */
function haveLink(fo: FileObject, ...p: string[]): string | undefined {
    if (!fo.isDir) {
        return p.join('/')
    }
    const haveIndexFile = fo.includes.some(v => v.name === 'index.md')

    if (haveIndexFile) {
        fo.includes = fo.includes.filter(v => v.name !== 'index.md')
        return p.join('/') + '/'
    }
    const haveSameNameFile = fo.includes.some(
        v => !filterSameFile(fo.name, v.name),
    )
    if (haveSameNameFile) {
        fo.includes = fo.includes.filter(v => filterSameFile(fo.name, v.name))
        return p.join('/') + '/' + fo.name + '.md'
    }
    return undefined
}

function filterSameFile(dirName: string, fileName: string): boolean {
    const s = fileName.split('.')
    if (s[0] === dirName && s[s.length - 1] === 'md') {
        return false
    }
    return true
}
