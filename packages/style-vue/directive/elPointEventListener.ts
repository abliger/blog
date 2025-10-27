/*
    统一处理鼠标和触摸输入,内部维护当前鼠标位置
*/

import { type Directive } from 'vue'

declare module 'vue' {
    export interface ComponentCustomProperties {
        vElPointEventListener: typeof vElPointEventListener
    }
}

const mousePosition = {
    mouseX: undefined,
    mouseY: undefined,
    _timex: undefined,
    _timey: undefined,
    setMouseX(x: number | undefined) {
        this.mouseX = x
        clearTimeout(this._timex)
        this._timex = window.setTimeout(() => {
            this.mouseX = undefined
        }, 100)
    },
    setMouseY(y: number | undefined) {
        this.mouseY = y
        clearTimeout(this._timey)
        this._timey = window.setTimeout(() => {
            this.mouseY = undefined
        }, 100)
    },
}

function onMouseMove(e: MouseEvent) {
    const rect = element!.getBoundingClientRect()
    mousePosition.setMouseX(e.clientX - rect.left)
    mousePosition.setMouseY(e.clientY - rect.top)
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault() // 防止页面滚动
    if (!e.touches[0]) return
    const rect = element!.getBoundingClientRect()
    const touch = e.touches[0]
    mousePosition.setMouseX(touch.clientX - rect.left)
    mousePosition.setMouseY(touch.clientY - rect.top)
}

function onMouseLeave() {
    mousePosition.mouseX = undefined
    mousePosition.mouseY = undefined
}

const onTouchEnd = onMouseLeave
let element = undefined
/*
统一处理鼠标和触摸输入,内部维护当前鼠标位置
*/
export const vElPointEventListener: Directive<HTMLElement, never> = {
    mounted: (el: HTMLElement) => {
        element = el
        el.addEventListener('touchstart', onTouchMove, { passive: false })
        el.addEventListener('touchmove', onTouchMove, { passive: false })
        el.addEventListener('touchend', onTouchEnd)
        el.addEventListener('touchcancel', onTouchEnd)
        el.addEventListener('mousemove', onMouseMove)
        el.addEventListener('mouseleave', onMouseLeave)
    },
    beforeUnmount: (el: HTMLElement) => {
        el.removeEventListener('touchstart', onTouchMove)
        el.removeEventListener('touchmove', onTouchMove)
        el.removeEventListener('touchend', onTouchEnd)
        el.removeEventListener('touchcancel', onTouchEnd)
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
    },
}

export function getMousePosition() {
    return {
        mouseX: mousePosition.mouseX,
        mouseY: mousePosition.mouseY,
    }
}
