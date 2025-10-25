<!-- 
    IconScroll 图标滚动组件
    接收一个图标数组 icons，图表默认分成两行,无限滚动显示
-->
<template>
    <div class="IconScroll">
        <div class="line">
            <div class="icons" :style="{ transform: 'translate3d(' + move[0] + '%,0px,0px)' }" ref="icons">
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="index" @mouseenter="pauseAnimation(1)"
                    @mouseleave="resumeAnimation">
                    <img :src="icon.imgSrc" :alt="icon.name" :title="icon.name" />
                </div>
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="index" @mouseenter="pauseAnimation(1)"
                    @mouseleave="resumeAnimation">
                    <img :src="icon.imgSrc" :alt="icon.name" :title="icon.name" />
                </div>
            </div>
        </div>
        <div class="line">
            <div class="icons" :style="{ transform: 'translate3d(' + move[1] + '%,0px,0px)' }" ref="icons">
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="index" @mouseenter="pauseAnimation(2)"
                    @mouseleave="resumeAnimation">
                    <img :src="icon.imgSrc" :alt="icon.name" :title="icon.name" />
                </div>
                <div class="icon-item" v-for="(icon, index) in props.icons" :key="index" @mouseenter="pauseAnimation(2)"
                    @mouseleave="resumeAnimation">
                    <img :src="icon.imgSrc" :alt="icon.name" :title="icon.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
    import { onMounted, ref, useTemplateRef, onUnmounted } from 'vue';
    import { throttle } from '../../../util/util';

    const icons = useTemplateRef<HTMLDivElement>('icons');
    const props = defineProps<{
        icons: { name: string, imgSrc: string }[];
    }>();

    const move = ref([0, 0]);
    const animationId = ref<number | null>(null);
    let effectRow = 0

    let isScorlling = false
    onMounted(() => {
        startAnimation();
        let timer = undefined
        window.addEventListener('scroll',
            throttle(() => {
                isScorlling = true
                clearTimeout(timer)
                timer = setTimeout(() => {
                    isScorlling = false
                }, 100);
            }, 100)
        );
    });

    function startAnimation() {
        if (animationId.value) return;
        let len = 0.01
        let c = 0;
        function anim() {
            len = (isScorlling && len == 0.01) ? 0.06 : 0.01;

            if (len > 0.01) {
                len -= 0.001
                c += 1
            } else {
                len = 0.01
            }
            move.value = [effectRow == 1 ? move.value[0] : move.value[0] - len, effectRow == 2 ? move.value[1] : move.value[1] + len];
            if (move.value[0] <= -50) {
                move.value[0] = 0;
            }
            if (move.value[1] >= 50) {
                move.value[1] = 0;
            }
            animationId.value = requestAnimationFrame(anim);
        }

        anim();
    }

    function pauseAnimation(row: number) {
        effectRow = row
    }

    function resumeAnimation() {
        effectRow = undefined
    }

    // 清理动画
    onUnmounted(() => {
        if (animationId.value) {
            cancelAnimationFrame(animationId.value);
        }
    });
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