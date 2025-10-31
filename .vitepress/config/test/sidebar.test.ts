import { expect, test } from 'vitest'
import { getSidebar } from '../sidebar'

test('测试侧边栏生成', async () => {
    const files = await getSidebar('testDir', '.vitepress/config/test/')
    expect(files).toEqual([
        {
            text: 'base',
            link: '/testDir/base/',
            collapsed: true,
            items: [
                {
                    text: 'baseContent',
                    link: '/testDir/base/baseContent.md',
                    collapsed: true,
                    items: undefined,
                },
                {
                    text: 'test1',
                    link: '/testDir/base/test1.md',
                    collapsed: true,
                    items: undefined,
                },
                {
                    text: 'test2',
                    link: '/testDir/base/test2.md',
                    collapsed: true,
                    items: undefined,
                },
                {
                    text: 'baseContent',
                    link: '/testDir/base/baseContent/baseContent.md',
                    collapsed: true,
                    items: [
                        {
                            text: 'base',
                            link: '/testDir/base/baseContent/base.md',
                            collapsed: true,
                            items: undefined,
                        },
                        {
                            text: 'testContent',
                            link: '/testDir/base/baseContent/testContent.md',
                            collapsed: true,
                            items: undefined,
                        },
                    ],
                },
                {
                    text: 'test',
                    link: '/testDir/base/test/',
                    collapsed: true,
                    items: [],
                },
            ],
        },
    ])
})
