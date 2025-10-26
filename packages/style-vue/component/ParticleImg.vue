<template>
    <div class="particleImg" ref="particleImg">
        <canvas id="particle" ref="canvas" v-el-point-event-listener></canvas>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
    import { getMousePosition, vElPointEventListener } from '../directive/elPointEventListener';
    import { dataLocation } from '../utils/utils';
    const particleImg = useTemplateRef<HTMLDivElement>('particleImg')
    const props = defineProps({
        imgSrc: { type: String, required: true },
        gap: { type: Number, default: 1 }, // 采样间隔，5%宽度
        particleRadius: { type: Number, default: 1 }, // 粒子半径
        power: { type: Number, default: 30 }, // 力强度
        radius: { type: Number, default: 10 }, // 力作用半径
        isRepulse: { type: Boolean, default: true }, // true 斥力 false 吸引
        canvasWidth: { type: Number, default: 400 }, // CSS px 固定宽度（可选）
        canvasHeight: { type: Number, default: 400 }, // CSS px 固定高度（可选）
        bwThreshold: { type: Number, default: 128 }, // 灰度阈值：>= 则为白，否则为黑
    })

    const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
    let ctx: CanvasRenderingContext2D | null = null

    let particles: Particle[] = []
    let rafId: number | null = null
    let img = new Image()

    onMounted(() => {
        if (!canvas.value) return
        img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = props.imgSrc
        img.onload = () => {
            start()
        }
    })

    function start() {
        if (!canvas.value) return
        ctx = canvas.value.getContext('2d')
        if (!ctx) return
        // 初始化 canvas 大小（仅首次设定，不再随窗口变化）
        initCanvasSize()
        createParticlesFromImage()
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(animate)
    }

    function initCanvasSize() {
        canvas.value.width = props.canvasWidth
        canvas.value.height = props.canvasHeight
    }

    function createParticlesFromImage() {
        buildVirtualCanvas()
        // const dpr = window.devicePixelRatio || 1
        particles = dataLocation('particles' + props.imgSrc, () => getImagePoints())
            .map(p => new Particle({ x: p.x, y: p.y }, p.color))
    }

    function buildVirtualCanvas() {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
        ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
    }

    /* 
        获得 canvas 图像上每个像素点的颜色信息, gap 决定采样间隔
        依据图像的灰度值决定该位置是黑色粒子还是白色粒子
    */
    function getImagePoints() {
        const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data

        const pts: { x: number; y: number; color: string }[] = []
        const threshold = props.bwThreshold ?? 128
        let gap = canvas.value.width * 0.01 * props.gap
        for (let y = 0; y < canvas.value.height; y += gap) {
            for (let x = 0; x < canvas.value.width; x += gap) {
                const pos = (y * canvas.value.width + x) * 4
                const r = imageData[pos]
                const g = imageData[pos + 1]
                const b = imageData[pos + 2]
                const a = imageData[pos + 3]
                if (a > 10) {
                    const lum = 0.299 * r + 0.587 * g + 0.114 * b
                    const isWhite = lum >= threshold
                    const alpha = (a / 255)
                    const color = isWhite ? `rgba(234, 234, 171,${alpha})` : `rgba(0,0,0,${alpha})`
                    pts.push({ x, y, color })
                }
            }
        }
        return pts
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.value.clientWidth, canvas.value.clientHeight)
        for (const p of particles) {
            p.draw()
        }
        rafId = requestAnimationFrame(animate)
    }

    onBeforeUnmount(() => {
        stop()
    })

    function stop() {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
    }

    // 支持图片切换时重建粒子（但不改变 canvas 大小）
    watch(() => props.imgSrc, (nv) => {
        if (!nv || !canvas.value) return
        img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = nv
        img.onload = () => {
            createParticlesFromImage()
        }
    })

    class Particle {
        targetX: number
        targetY: number
        x: number
        y: number
        radius: number
        color: string
        positionUpdateFactor: number = 20

        constructor(point: { x: number; y: number }, color = 'purple') {
            this.targetX = point.x
            this.targetY = point.y
            this.x = Math.round(Math.random() * (canvas.value.width || 1))
            this.y = Math.round(Math.random() * (canvas.value.height || 1))
            this.radius = props.particleRadius
            this.color = color
        }

        draw() {
            if (!ctx) return
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
            this.update()
        }

        update() {
            if (particleImg.value.style.display === 'none') return
            const mx = this.targetX - this.x
            const my = this.targetY - this.y
            let vx = mx / this.positionUpdateFactor
            let vy = my / this.positionUpdateFactor
            let [dx, dy] = this.mouseMove()
            this.x += vx + dx
            this.y += vy + dy
        }

        // 鼠标移入时的作用力计算
        mouseMove() {
            const { mouseX, mouseY } = getMousePosition()
            if (mouseX !== undefined && mouseY !== undefined) {
                let dx = mouseX - this.x
                let dy = mouseY - this.y
                let distance = Math.sqrt(dx * dx + dy * dy)
                let preDistance = props.radius * 4 / distance
                const angle = Math.atan2(dy, dx)

                let repX = distance > props.power ? (Math.random() * 2 - 1) * preDistance : Math.cos(angle) * props.power
                let repY = distance > props.power ? (Math.random() * 2 - 1) * preDistance : Math.sin(angle) * props.power


                if (props.isRepulse) {
                    return [-repX, -repY]
                } else {
                    return [repX, repY]
                }
            }
            return [0, 0]
        }
        [Symbol.toStringTag] = 'Particle';

    }
</script>
<style lang="css" scoped>
    .particleImg {
        /* height: v-bind(canvasHeight + 'px');
        width: v-bind(canvasWidth+'px'); */
        overflow: hidden;
        position: relative;
    }
</style>