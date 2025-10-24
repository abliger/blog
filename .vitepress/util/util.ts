// 防抖和节流函数
export function debounce(func: Function, wait: number) {
    let timeout: number | undefined;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

export function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function (...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
// 贝塞尔函数
export function getBezierPoint(p0, p1, p2, p3, t, x) {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;
    return uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x
}

export function dataLoaction(key: string, f: () => any) {
    let ptsJson = localStorage.getItem(key)
    if (!ptsJson) {
        const pts = f()
        localStorage.setItem(key, JSON.stringify(pts))
        return pts
    } else {
        return JSON.parse(ptsJson)
    }
}