/*
    获得 浏览器缓存内容,如果没有保存 f 函数返回值
*/
export function dataLocation(key: string, f?: () => unknown) {
    const ptsJson = localStorage.getItem(key)
    if (!ptsJson) {
        const pts = f()
        localStorage.setItem(key, JSON.stringify(pts))
        return pts
    } else {
        return JSON.parse(ptsJson)
    }
}

// 防抖函数,函数不调用后,等待 wait 时间后调用
export function debounce(func: (..._: unknown[]) => void, wait: number) {
    let timeout: number | undefined
    return function(...args: unknown[]) {
        clearTimeout(timeout)
        timeout = window.setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
/* 
    节流函数,在限制时间内只运行一次
*/
export function throttle(func: (..._: unknown[]) => void, limit: number) {
    let inThrottle: boolean
    return function(...args: unknown[]) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}
// 贝塞尔函数
export function getBezierPoint(p0, p1, p2, p3, t) {
    const u = 1 - t
    const tt = t * t
    const uu = u * u
    const uuu = uu * u
    const ttt = tt * t
    return uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x
}