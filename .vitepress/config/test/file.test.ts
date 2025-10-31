import { expect, test } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDirAllObjects } from '../file'

test('测试路径错误', async () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))

    expect(() =>
        getDirAllObjects(
            path.resolve(currentDir, 'testDir', 'base', 'unknown'),
        ),
    ).toThrowError(Error)
})

test('测试文件对象生成', async () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))

    const files = getDirAllObjects(
        path.resolve(currentDir, 'testDir', 'base', 'baseContent'),
    )

    expect(files).toEqual({
        isDir: true,
        path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent',
        name: 'baseContent',
        includes: [
            {
                isDir: false,
                path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent/base.md',
                name: 'base.md',
                includes: undefined,
            },
            {
                isDir: false,
                path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent/baseContent.md',
                name: 'baseContent.md',
                includes: undefined,
            },
            {
                isDir: false,
                path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent/baseContent.ts',
                name: 'baseContent.ts',
                includes: undefined,
            },

            {
                isDir: false,
                path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent/testContent.md',
                name: 'testContent.md',
                includes: undefined,
            },
        ],
    })
})

test('测试文件对象生成,有忽略文件', async () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))
    const files = getDirAllObjects(
        path.resolve(currentDir, 'testDir', 'base', 'baseContent'),
        [`baseContent`],
    )

    expect(files).toEqual(undefined)
})

test('测试文件对象生成,有忽略文件', async () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url))
    const files = getDirAllObjects(
        path.resolve(currentDir, 'testDir', 'base', 'baseContent'),
        [`.*\\.md`],
    )

    expect(files).toEqual({
        includes: [
            {
                isDir: false,
                name: 'baseContent.ts',
                path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent/baseContent.ts',
                includes: undefined,
            },
        ],
        isDir: true,
        name: 'baseContent',
        path: '/Users/fengsixue/Documents/Document/.vitepress/config/test/testDir/base/baseContent',
    })
})
