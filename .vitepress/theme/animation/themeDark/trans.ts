import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'
import './in.css'

export function useToggleTheme() {

    const { isDark } = useData()

    const enableTransitions = () =>
        'startViewTransition' in document &&  // 检查浏览器是否支持 View Transitions API
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches // 检查用户是否未开启减少动画设置

    provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
        if (!enableTransitions()) {
            isDark.value = !isDark.value
            return
        }

        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${Math.hypot(
                Math.max(x, innerWidth - x),
                Math.max(y, innerHeight - y)
            )}px at ${x}px ${y}px)`
        ]

        await document.startViewTransition(async () => {
            isDark.value = !isDark.value
            // 手动让页面渲染好拍摄快照
            await nextTick()
        }).ready
        // 在根元素上执行自定义动画
        document.documentElement.animate(
            { clipPath: isDark.value ? clipPath.reverse() : clipPath },
            {
                duration: 500,
                easing: 'ease-in',
                // 使用视图过渡 API 的伪元素作为动画容器
                pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
            }
        )
    })
}