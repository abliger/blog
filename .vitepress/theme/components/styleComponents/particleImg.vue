<template>
    <div class="PartocleImg" style="width:100%;height:100%;position:relative;">
        <canvas id="particle" ref="canvas"></canvas>
    </div>
</template>
<script setup lang="ts">
    // filepath: /Users/fengsixue/Documents/Document/.vitepress/theme/components/styleComponents/particleImg.vue
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

    const props = defineProps<{
        imgSrc: string;
        gap?: number; // pixel sampling gap
        particleRadius?: number;
        power?: number; // repulse/attract strength
        radius?: number; // mouse influence radius
        canvasWidth?: number; // CSS px 固定宽度（可选）
        canvasHeight?: number; // CSS px 固定高度（可选）
        bwThreshold?: number; // 灰度阈值：>= 则为白，否则为黑
    }>()

    const canvas = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D | null = null

    // options / defaults
    const defaultCssW = props.canvasWidth ?? 400
    const defaultCssH = props.canvasHeight ?? 400

    const options = {
        width: 400,
        height: 200,
    }
    const gap = props.gap ?? 10
    const particleRadius = props.particleRadius ?? 3
    const Power = props.power ?? 0.8
    const Radius = props.radius ?? 100
    const timeFactor = 20 // for easing toward target

    const mousePosition = {
        mouseX: undefined as number | undefined,
        mouseY: undefined as number | undefined,
    }

    let particles: Particle[] = []
    let rafId: number | null = null
    let img = new Image()
    let virtualCanvas: HTMLCanvasElement | null = null
    let virtualCtx: CanvasRenderingContext2D | null = null

    class Particle {
        targetX: number
        targetY: number
        x: number
        y: number
        vx = 0
        vy = 0
        radius: number
        color: string

        constructor(point: { x: number; y: number }, color = 'purple') {
            this.targetX = point.x
            this.targetY = point.y
            this.x = Math.round(Math.random() * (options.width || 1))
            this.y = Math.round(Math.random() * (options.height || 1))
            this.radius = particleRadius
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
            const mx = this.targetX - this.x
            const my = this.targetY - this.y
            this.vx = mx / timeFactor
            this.vy = my / timeFactor

            const { mouseX, mouseY } = mousePosition
            if (mouseX !== undefined && mouseY !== undefined) {
                let dx = mouseX - this.x
                let dy = mouseY - this.y
                let distance = Math.sqrt(dx * dx + dy * dy) || 0.001

                let disPercent = Radius / distance
                disPercent = disPercent > 7 ? 7 : disPercent

                const angle = Math.atan2(dy, dx)
                const repX = Math.cos(angle) * Power * disPercent
                const repY = Math.sin(angle) * Power * disPercent

                // repulse: subtract to push away; you can invert sign to attract
                this.vx -= repX
                this.vy -= repY
            }

            this.x += this.vx
            this.y += this.vy
        }

        change(targetX: number, targetY: number) {
            this.targetX = targetX
            this.targetY = targetY
        }
    }

    function initCanvasSize() {
        const cvs = canvas.value!
        // 固定可视尺寸（CSS 像素），不随窗口变化改变
        cvs.style.width = `${defaultCssW}px`
        cvs.style.height = `${defaultCssH}px`

        // 内部像素按设备像素比设置一次，保证清晰度，但不再在 resize 时修改
        const dpr = window.devicePixelRatio || 1
        const width = Math.max(1, Math.floor(defaultCssW * dpr))
        const height = Math.max(1, Math.floor(defaultCssH * dpr))
        cvs.width = width
        cvs.height = height
        options.width = width
        options.height = height

        if (ctx) {
            // 重置变换并按 DPR 缩放，使后续绘制以 CSS 像素为坐标系
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)
        }
    }

    function buildVirtualCanvas() {
        virtualCanvas = document.createElement('canvas')
        virtualCanvas.width = options.width
        virtualCanvas.height = options.height
        virtualCtx = virtualCanvas.getContext('2d')
        if (!virtualCtx) return
        // draw image to virtual canvas, fit to canvas
        virtualCtx.clearRect(0, 0, options.width, options.height)
        // ensure full coverage while maintaining aspect ratio
        const iw = img.naturalWidth || img.width
        const ih = img.naturalHeight || img.height
        const scale = Math.max(options.width / iw, options.height / ih)
        const dw = iw * scale
        const dh = ih * scale
        const dx = (options.width - dw) / 2
        const dy = (options.height - dh) / 2
        virtualCtx.drawImage(img, dx, dy, dw, dh)
    }

    function getImagePoints() {
        if (!virtualCtx) return []
        const imageData = virtualCtx.getImageData(0, 0, options.width, options.height).data
        const pts: { x: number; y: number; color: string }[] = []
        const threshold = props.bwThreshold ?? 128

        for (let y = 0; y < options.height; y += gap) {
            for (let x = 0; x < options.width; x += gap) {
                const pos = (y * options.width + x) * 4
                const r = imageData[pos]
                const g = imageData[pos + 1]
                const b = imageData[pos + 2]
                const a = imageData[pos + 3]
                // treat any non-transparent pixel as point
                if (a > 10) {
                    // convert to luminance (grayscale) and threshold to black/white
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

    function createParticlesFromImage() {
        if (!canvas.value) return
        buildVirtualCanvas()
        const pts = getImagePoints()
        const dpr = window.devicePixelRatio || 1
        // 目标坐标在绘制时需要以 CSS 像素为单位（因为 ctx 已按 dpr 缩放），所以除以 dpr
        particles = pts.map(p => new Particle({ x: p.x / dpr, y: p.y / dpr }, p.color))
        // set canvas visible drawing scale: because we scaled ctx by DPR, we pass points divided by dpr
    }

    function animate() {
        if (!ctx || !canvas.value) return
        // clear in CSS pixels (ctx is scaled for DPR, so clear using clientWidth/height)
        const w = canvas.value.clientWidth
        const h = canvas.value.clientHeight
        ctx.clearRect(0, 0, w, h)
        // draw particles
        for (const p of particles) {
            p.draw()
        }
        rafId = requestAnimationFrame(animate)
    }

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

    function stop() {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
    }

    function onMouseMove(e: MouseEvent) {
        if (!canvas.value) return
        const rect = canvas.value.getBoundingClientRect()
        mousePosition.mouseX = e.clientX - rect.left
        mousePosition.mouseY = e.clientY - rect.top
    }

    function onMouseLeave() {
        mousePosition.mouseX = undefined
        mousePosition.mouseY = undefined
    }

    onMounted(() => {
        if (!canvas.value) return
        img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = props.imgSrc
        img.onload = () => {
            start()
        }
        canvas.value.addEventListener('mousemove', onMouseMove)
        canvas.value.addEventListener('mouseleave', onMouseLeave)
    })

    onBeforeUnmount(() => {
        if (canvas.value) {
            canvas.value.removeEventListener('mousemove', onMouseMove)
            canvas.value.removeEventListener('mouseleave', onMouseLeave)
        }
        stop()
    })

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
</script>
<style lang="css">
    .PartocleImg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    canvas {
        display: block;
        /* 可视大小由 script 中的 canvasWidth / canvasHeight 控制 */
        touch-action: none;
    }
</style>