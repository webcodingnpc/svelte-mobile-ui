/**
 * BEM 命名工具
 * @param name 组件名
 * @returns [prefix, bem 函数]
 */
export function createNamespace(name: string) {
    const prefix = `smu-${name}`

    const bem = (
        el?: string | Record<string, boolean | undefined>,
        mod?: Record<string, boolean | undefined>
    ): string => {
        if (typeof el === 'object' && el !== null) {
            // bem({ primary: true }) → 'smu-button smu-button--primary'
            const mods = Object.entries(el)
                .filter(([, v]) => v)
                .map(([k]) => `${prefix}--${k}`)
            return [prefix, ...mods].join(' ')
        }

        if (el) {
            const base = `${prefix}__${el}`
            if (mod) {
                const mods = Object.entries(mod)
                    .filter(([, v]) => v)
                    .map(([k]) => `${base}--${k}`)
                return [base, ...mods].join(' ')
            }
            return base
        }

        return prefix
    }

    return [prefix, bem] as const
}

/** 生成唯一 ID */
let uid = 0
export function useId(prefix = 'smu') {
    return `${prefix}-${++uid}`
}

/** px 转换 */
export function addUnit(value?: string | number): string | undefined {
    if (value === undefined || value === null || value === '') return undefined
    if (typeof value === 'number') return `${value}px`
    return value
}

/** 阻止默认事件 */
export function preventDefault(event: Event, isStopPropagation?: boolean) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
    }
    if (isStopPropagation) {
        event.stopPropagation()
    }
}

/** 是否已定义 */
export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null
}

/** 数字类型判断 */
export function isNumeric(val: string | number): boolean {
    return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}

/** clamp 限制范围 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max)
}

/** noop */
export const noop = () => { }

/** 将 px 单位的值转换为 vw (基于 375 设计稿) */
export function pxToVw(px: number): string {
    return `${(px / 375) * 100}vw`
}
