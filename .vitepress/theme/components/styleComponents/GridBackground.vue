<template>
    <div class="GridBackground">
        <div class="grid">
            <canvas ref="canvas" class="gridCanvas" />
        </div>

        <slot></slot>
    </div>
</template>
<script setup lang="ts">
    import { debounce } from 'style-vue'
    import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

    const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
    let ctx: CanvasRenderingContext2D | null = null
    const gridSize = 30 // 网格大小
    let rafId: number | null = null
    let currentGrid = { x: -1, y: -1 } // 当前鼠标所在网格坐标

    onMounted(() => {
        if (!canvas.value) return
        ctx = canvas.value.getContext('2d')
        initCanvasSize()
        resize()
        startAnimation() // 启动动画循环
    })

    onBeforeUnmount(() => {
        if (rafId) cancelAnimationFrame(rafId)
        window.removeEventListener('resize', handleResize) // 移除事件监听
    })

    // 初始化画布大小
    function initCanvasSize() {
        if (!canvas.value) return
        // 使用视口大小而非屏幕大小，避免滚动问题
        canvas.value.width = window.innerWidth
        canvas.value.height = window.innerHeight
    }

    // 处理窗口 resize
    const handleResize = debounce(() => {
        initCanvasSize()
        drawGrid()
    }, 300)

    function resize() {
        window.addEventListener('resize', handleResize)
    }

    // 启动动画循环实时更新网格
    function startAnimation() {
        const update = () => {
            drawGrid()
            rafId = requestAnimationFrame(update)
        }
        update()
    }

    // 绘制网格（含高亮逻辑）
    function drawGrid() {
        if (!ctx || !canvas.value) return

        // 1. 清空画布
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

        // 3. 绘制普通网格线
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(37, 29, 40, 0.9)' // 普通网格线颜色（浅灰色）
        ctx.lineWidth = 1
        // 绘制水平线
        for (let y = 0; y <= canvas.value.height; y += gridSize) {
            // 跳过需要高亮的线，后续单独绘制
            if (
                currentGrid.y !== -1 &&
                (y === currentGrid.y * gridSize ||
                    y === (currentGrid.y + 1) * gridSize)
            ) {
                continue
            }
            ctx.moveTo(0, y)
            ctx.lineTo(canvas.value.width, y)
        }

        // 绘制垂直线
        for (let x = 0; x <= canvas.value.width; x += gridSize) {
            // 跳过需要高亮的线，后续单独绘制
            if (
                currentGrid.x !== -1 &&
                (x === currentGrid.x * gridSize ||
                    x === (currentGrid.x + 1) * gridSize)
            ) {
                continue
            }
            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvas.value.height)
        }
        ctx.stroke()
    }
</script>
<style lang="css" scoped>
    .grid {
        position: fixed;
        inset: 0;
        pointer-events: none; /* 允许鼠标事件穿透画布，不影响下层元素 */
        z-index: -100;
    }

    .gridCanvas {
        position: absolute;
        inset: 0;
    }
</style>
