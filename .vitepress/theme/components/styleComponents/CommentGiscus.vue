<template>
    <div class="content-container" style="margin: 0 20%"></div>
</template>

<script setup>
    import giscusTalk from 'vitepress-plugin-comment-with-giscus'
    import { useData, useRoute } from 'vitepress'

    const { frontmatter } = useData()
    const route = useRoute()
    import env from '../../../config/env/env.config'
    giscusTalk(
        {
            repo: 'abliger/blog',
            repoId: env.repoId,
            category: 'General',
            categoryId: env.repoId,
            mapping: 'pathname',
            inputPosition: 'top',
            lang: 'zh-CN',
            locales: {
                'zh-Hans': 'zh-CN',
                'en-US': 'en',
            },
            homePageShowComment: false,
            lightTheme: 'light',
            darkTheme: 'catppuccin_frappe',
            // ...
        },
        {
            frontmatter,
            route,
        },
        true,
    )
</script>
