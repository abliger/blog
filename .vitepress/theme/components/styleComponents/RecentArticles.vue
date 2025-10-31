<template>
    <div>
        <div class="title">文稿</div>
        <div class="content">
            <div v-for="c in contentTitle" :key="c.date">
                <div>
                    <a :href="c.href">{{ c.title }}</a>
                </div>
                <div>{{ c.data }}</div>
            </div>
        </div>
    </div>
    <br />
    <div>
        <div class="title">手记</div>
        <div class="content">
            <div v-for="c in contentTitle" :key="c.date">
                <div>
                    <a :href="c.href">{{ c.title }}</a>
                </div>
                <div>{{ c.data }}</div>
            </div>
        </div>
    </div>
    {{ theme }}
</template>
<script setup lang="tsx">
    const contentTitle = []
    import { useData } from 'vitepress'

    const { theme } = useData()
    console.log(theme.value)
</script>
