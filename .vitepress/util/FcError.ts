class FCError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'FCError'
        // 保持 prototype 链（针对旧版 TS/ES）
        Object.setPrototypeOf(this, FCError.prototype)
    }
}

export { FCError }
