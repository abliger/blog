<template>
    <div
        ref="imageContainer"
        class="three"
        :class="{ visible: isVisible }"
        :style="{
            backgroundImage: `url(${src})`,
        }"
    />
</template>
<script lang="tsx" setup>
    import { ref, onMounted } from 'vue'

    const props = withDefaults(
        defineProps<{
            src: string
            triggerOnce?: boolean
        }>(),
        {
            triggerOnce: true,
        },
    )

    const imageContainer = ref<HTMLElement | null>(null)
    const isVisible = ref(false)
    const observer = ref<IntersectionObserver | null>(null)

    onMounted(() => {
        if (!imageContainer.value) return
        observer.value = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        isVisible.value = true
                        if (props.triggerOnce && observer.value) {
                            observer.value.unobserve(entry.target)
                        }
                    } else if (!props.triggerOnce) {
                        isVisible.value = false
                    }
                })
            },
            {
                threshold: 1,
            },
        )
        observer.value.observe(imageContainer.value)
    })
</script>
<style lang="scss" scoped>
    @use 'sass:math';
    $count: 900;
    $sqrt: 30;
    $per: calc(100% / $sqrt);
    $width: 500px;
    $perWid: 15;

    @for $i from 1 to ($count + 1) {
        @property --m-#{$i} {
            syntax: '<number>';
            initial-value: 0;
            inherits: false;
        }
    }

    @function bgSet($n) {
        $bg: radial-gradient(
            rgba(0, 0, 0, var(--m-1)),
            rgba(0, 0, 0, var(--m-1))
        );

        @for $i from 2 through $n {
            $bg:
                $bg,
                radial-gradient(
                    rgba(0, 0, 0, var(--m-#{$i})),
                    rgba(0, 0, 0, var(--m-#{$i}))
                );
        }

        @return $bg;
    }

    @function positionSet($n) {
        $bgPosition: ();

        @for $i from 0 through ($n) {
            @for $j from 0 through ($n - 1) {
                $bgPosition:
                    $bgPosition,
                    #{$i * $perWid}px #{$j * $perWid}px;
            }
        }

        @return $bgPosition;
    }

    @function transitionSet($n) {
        $transition: --m-1 0.1s 0.1s;

        @for $i from 1 through $n {
            $transition:
                $transition,
                --m-#{$i}
                    #{100 +
                    math.random(500)}ms
                    #{calc($i / 50) *
                    math.random(100)}ms;
        }

        @return $transition;
    }

    div {
        width: $width;
        height: $width;
        background-size: cover;
        background-position: center center;
        margin: auto;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .three {
        mask: bgSet($count);
        mask-size: $per $per;
        mask-repeat: no-repeat;
        mask-position: positionSet($sqrt);
        transition: transitionSet($count);
        -webkit-mask: bgSet($count);
        -webkit-mask-size: $per $per;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: positionSet($sqrt);
    }

    .visible {
        @for $i from 1 through $count {
            --m-#{$i}: 1;
        }
    }
</style>
