<template>
    <span v-for="(k, i) in text" :key="i" class="smokyText">
        <!-- :style="{ 'animation-delay': `${3 + i / 10}s` }" -->
        {{ k }}
    </span>
</template>
<script lang="tsx" setup>
    defineProps<{ text: string }>()
</script>
<style lang="scss" scoped>
    span {
        display: inline-block;
        text-shadow: 0 0 0 whitesmoke;
        animation: smoky 5s 3s both;
        backface-visibility: hidden;
        color: transparent;
    }

    span:nth-child(even) {
        animation-name: smoky-mirror;
    }

    @keyframes smoky {
        60% {
            text-shadow: 0 0 40px whitesmoke;
        }
        to {
            transform: translate3d(15rem, -8rem, 0) rotate(-20deg) skewX(30deg)
                scale(1.5);
            text-shadow: 0 0 20px whitesmoke;
            opacity: 0;
        }
    }

    @keyframes smoky-mirror {
        60% {
            text-shadow: 0 0 40px whitesmoke;
        }
        to {
            transform: translate3d(18rem, -8rem, 0) rotate(-20deg) skewX(-30deg)
                scale(2);
            text-shadow: 0 0 20px whitesmoke;
            opacity: 0;
        }
    }
</style>
