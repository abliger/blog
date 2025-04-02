<template>
    <div class="contenter" ref="contenter">
        <div>
            <svg width="100" height="100" viewBox="0 0 24 24">
                <path
                    d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z" />
            </svg>
        </div>

    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useTemplateRef } from 'vue'
const re = useTemplateRef('contenter')
onMounted(() => {
    const temp = re.value as HTMLDivElement
    temp.addEventListener('scroll', () => {
        temp.style.setProperty('--scroll', (temp.scrollTop / (document.body.offsetHeight - temp.clientHeight) / 60).toString());
    }, false);
})

</script>
<style scoped>
.contenter {
    margin: 20px auto;
    width: 400px;
    height: 300px;
    border: 1px solid black;
    background-color: antiquewhite;
    overflow: scroll;
    position: relative;
}

.contenter>div {
    height: 2000px;
}

svg {
    position: sticky;
    top: 130px;
    left: 200px;
    animation: rotate 1s linear infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * -1s);
    animation-fill-mode: both;
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>