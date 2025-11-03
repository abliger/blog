<template>
    <!-- 
    IconScroll 图标滚动组件
    接收一个图标数组 icons，图表默认分成两行,无限滚动显示
    -->
    <div class="IconScroll">
        <div v-for="k in 2" :key="k" class="line">
            <div
                ref="icons"
                class="icons"
                :style="{
                    transform: `translate3d(${k === 1 ? move[0] : move[1]}%,0px,0px)`,
                }"
            >
                <template v-for="i in 2" :key="i">
                    <div
                        v-for="(icon, index) in skill"
                        :key="index"
                        class="icon-item"
                        @mouseenter="pauseAnimation(k)"
                        @mouseleave="resumeAnimation"
                    >
                        <img
                            :src="icon.imgSrc"
                            :alt="icon.name"
                            :title="icon.name"
                            loading="eager"
                            crossorigin="anonymous"
                        />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
    import { onMounted, ref, useTemplateRef, onUnmounted, inject } from 'vue'
    import { throttle } from '../utils/utils'

    const icons = useTemplateRef<HTMLDivElement>('icons')
    const skill = inject<Array<{ imgSrc: string; name: string }>>('skill')

    const move = ref([0, 0])
    let animationId: number = 0
    let effectRow = 0

    let isScrolling = false
    onMounted(() => {
        startAnimation()
        let timer = undefined
        window.addEventListener(
            'scroll',
            throttle(() => {
                isScrolling = true
                clearTimeout(timer)
                timer = setTimeout(() => {
                    isScrolling = false
                }, 100)
            }, 100),
        )
    })

    function startAnimation() {
        if (animationId) return
        let len = 0.01
        function anim() {
            len = isScrolling && len == 0.01 ? 0.06 : 0.01
            if (len > 0.01) {
                len -= 0.001
            } else {
                len = 0.01
            }
            move.value = [
                effectRow == 1 ? move.value[0] : move.value[0] - len,
                effectRow == 2 ? move.value[1] : move.value[1] + len,
            ]
            if (move.value[0] <= -50) {
                move.value[0] = 0
            }
            if (move.value[1] >= 50) {
                move.value[1] = 0
            }
            animationId = requestAnimationFrame(anim)
        }

        anim()
    }

    function pauseAnimation(row: number) {
        effectRow = row
    }

    function resumeAnimation() {
        effectRow = undefined
    }

    // 清理动画
    onUnmounted(() => {
        if (animationId) {
            cancelAnimationFrame(animationId)
        }
    })
</script>

<style lang="css" scoped>
    .IconScroll {
        width: 100%;
        position: relative;
        padding: 20px 0;
        user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
    }

    .line {
        margin: 10px 0;
        display: flex;
    }

    .line:nth-child(2) {
        justify-content: end;
    }

    .icons {
        display: flex;
        width: max-content;
        gap: 8px;
        flex-shrink: 0;
    }

    .icon-item {
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .icon-item:hover {
        transform: scale(1.05);
    }
</style>
