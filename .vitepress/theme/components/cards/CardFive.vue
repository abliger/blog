<template>
    <div class="card5">
        <div class="left">
            <div>
                <div class="title">文稿</div>
                <div class="content">
                    <li v-for="c in contentTitle" :key="c.date">
                        <div>
                            <a :href="c.href">{{ c.title }}</a>
                        </div>
                        <div>{{ c.data }}</div>
                    </li>
                </div>
            </div>
            <br />
            <div>
                <div class="title">手记</div>
                <div class="content">
                    <li v-for="c in contentTitle" :key="c.date">
                        <div>
                            <a :href="c.href">{{ c.title }}</a>
                        </div>
                        <div>{{ c.data }}</div>
                    </li>
                </div>
            </div>
        </div>
        <div class="right">
            <div>steam</div>
            <div>图书</div>
            <div>追番</div>
            <div>音乐</div>
        </div>
    </div>
</template>
<script setup lang="tsx">
    import { onMounted } from 'vue'
    // fetch()

    const contentTitle = []

    onMounted(() => {})
</script>
<style lang="css" scoped></style>
