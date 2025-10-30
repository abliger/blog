export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', // bug 修复
                'docs', // 文档更新
                'style', // 样式调整
                'refactor', // 代码重构
                'test', // 编写测试用例
                'revert', // 代码回滚
                'chore', // 项目配置更新
                'perf', // 性能优化
            ],
        ],
        'body-min-length': [2, 'always', 4],
    },
    prompt: {
        messages: {
            type: '选择你要提交的类型 :',
            scope: '选择一个提交范围（可选）:',
            customScope: '请输入自定义的提交范围 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
            breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
            footerPrefixesSelect: '选择关联issue前缀（可选）:',
            customFooterPrefix: '输入自定义issue前缀 :',
            footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
            generatingByAI: '正在通过 AI 生成你的提交简短描述...',
            generatedSelectByAI: '选择一个 AI 生成的简短描述:',
            confirmCommit: '是否提交或修改commit ?',
        },
        // prettier-ignore
        types: [
            { value: 'feat', name: '特性:     新增功能', emoji: ':sparkles:' },
            { value: 'fix', name: '修复:     修复bug', emoji: ':bug:' },
            { value: 'docs', name: '文档:     文档变更', emoji: ':memo:' },
            { value: 'style', name: '格式:     代码格式（不影响功能，例如空格、分号等格式修正）', emoji: ':lipstick:' },
            { value: 'refactor', name: '重构:     代码重构（不包括 bug 修复、功能新增）', emoji: ':recycle:' },
            { value: 'perf', name: '性能:     性能优化', emoji: ':zap:' },
            { value: 'test', name: '测试:     添加疏漏测试或已有测试改动', emoji: ':white_check_mark:' },
            { value: 'build', name: '构建:     构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）', emoji: ':package:' },
            { value: 'ci', name: '集成:     修改 CI 配置、脚本', emoji: ':ferris_wheel:' },
            { value: 'revert', name: '回退:     回滚 commit', emoji: ':rewind:' },
            { value: 'chore', name: '其他:     对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: ':hammer:' },
        ],
        scopes: ['.vitepress', 'style-vue', 'doc', 'config', 'other'],
        scopeEnumSeparator: ',',
        enableMultipleScopes: true,
        useEmoji: true,
        emojiAlign: 'center',
        useAI: false,
        aiNumber: 1,
        themeColorCode: '',
        allowCustomScopes: true,
        allowEmptyScopes: true,
        customScopesAlign: 'bottom',
        customScopesAlias: 'custom',
        emptyScopesAlias: 'empty',
        upperCaseSubject: false,
        markBreakingChangeMode: false,
        allowBreakingChanges: ['feat', 'fix'],
        breaklineNumber: 100,
        breaklineChar: '|',
        skipQuestions: [],
        issuePrefixes: [
            { value: 'closed', name: 'closed:   ISSUES has been processed' },
        ],
        customIssuePrefixAlign: 'top',
        emptyIssuePrefixAlias: 'skip',
        customIssuePrefixAlias: 'custom',
        allowCustomIssuePrefix: true,
        allowEmptyIssuePrefix: true,
        confirmColorize: true,
        maxHeaderLength: Infinity,
        maxSubjectLength: Infinity,
        minSubjectLength: 0,
        scopeOverrides: undefined,
        defaultBody: '',
        defaultIssues: '',
        defaultScope: '',
        defaultSubject: '',
    },
}
