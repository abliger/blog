import { type Config } from 'prettier'

export default {
    trailingComma: 'all', //尾随逗号
    tabWidth: 4,
    useTabs: false,
    semi: false, // 末尾分号
    singleQuote: true, // 单引号
    bracketSpacing: true, // 对象中使用空格和内容分开
    bracketSameLine: false, //将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。
    arrowParens: 'avoid', // 箭头函数括号 尽可能省略括号
    vueIndentScriptAndStyle: true,
} as Config
