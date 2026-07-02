import { defineConfig } from 'vitest/config'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: 'all',
    },
    test: {
        include: ['.vitepress/**/*.test.ts'],
        exclude: ['**/node_modules/**', '**/.git/**', 'doc/**', 'project/**'],
    },
})
