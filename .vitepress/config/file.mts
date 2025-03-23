import type { DefaultTheme } from 'vitepress'
import { filesToSidebar, getUrlFile } from '../util/getUrlFile.ts'
let java = getUrlFile('./doc/java', ['md'])
let linux = getUrlFile('./doc/linux', ['md'])
let docker = getUrlFile('./doc/docker', ['md'])
let design = getUrlFile('./doc/设计模式', ['md'])
const filedir = {
    java,
    linux,
    docker,
    "设计模式": design,
}
async function getArchieve() {
    return [{
        text: "Java",
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
    }] as DefaultTheme.SidebarItem[];
}

const archieve = await getArchieve();
// 导出归档文件夹的路径 
export const archiveDir: DefaultTheme.Sidebar = {
    "/achieve": archieve,
    "/java": archieve,
    "/linux": archieve,
    "/docker": archieve,
    "/设计模式": archieve
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
export const dir = getFiles(filedir)

export function getFileNameByNextOrPrev(str: string): string {
    let sp = str.split('/')
    let filename = sp.pop()
    let name = filename?.split(".").shift()
    if (name === 'index') {
        return sp.pop()!
    }
    return name!
}