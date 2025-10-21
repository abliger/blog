<template>
    <div>
        <slot></slot>
        <span class="typing" ref="typing"></span>
    </div>
</template>
<script setup lang="tsx">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
const typing = useTemplateRef('typing')
const props = defineProps<{
    strs: string[];
}>()

let timer: ReturnType<typeof setTimeout> | null = null;
let stopped = false;

function animateTyping(strs: string[], speed: number, index = 0, pos = 0, direction = 1) {
    if (stopped || !Array.isArray(strs) || strs.length === 0) return;

    const text = strs[index] ?? '';
    // 安全访问 DOM 节点并使用 textContent 避免不必要的 innerHTML
    if (!typing.value) return;

    typing.value.textContent = text.substring(0, pos);

    if (direction === 1) {
        // 正在输入
        if (pos < text.length) {
            timer = setTimeout(() => animateTyping(strs, speed, index, pos + 1, 1), speed);
        } else {
            // 输入完成，停留一段时间后开始删除
            timer = setTimeout(() => animateTyping(strs, speed, index, pos - 1, -1), 2000);
        }
    } else {
        // 正在删除
        if (pos > 0) {
            timer = setTimeout(() => animateTyping(strs, speed, index, pos - 1, -1), speed);
        } else {
            // 删除完成，切换到下一个字符串并开始输入
            const nextIndex = (index + 1) % strs.length;
            timer = setTimeout(() => animateTyping(strs, speed, nextIndex, 0, 1), 500);
        }
    }
}

onMounted(() => {
    if (props.strs.length <= 0) {
        throw new Error("FcTyping 组件需要传入非空的 strs 属性");
    }
    stopped = false;
    animateTyping(props.strs, 100);
});

onUnmounted(() => {
    stopped = true;
    if (timer) clearTimeout(timer);
});
</script>
<style lang="css" scoped>
.typing::after {
    content: '';
    animation: blink 1s infinite;
    border-right: 2px solid orange;
    margin-left: 2px;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
