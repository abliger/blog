import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import dtsPlugin from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vueJsx(), vue(), dtsPlugin()],
    optimizeDeps: {
        include: ['linked-dep'],
    },
    build: {
        sourcemap: true,
        watch: {
            include: ['*.config.js', 'src/**', 'package.json'],
        },
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            cssFileName: 'index',
        },
        commonjsOptions: {
            include: [/linked-dep/, /node_modules/],
        },
        minify: false,
        rollupOptions: {
            external: ['vue'],
            input: ['index.ts'],
            output: [
                {
                    globals: {
                        vue: 'Vue',
                    },
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    dir: 'dist',
                },
            ],
        },
    },
})
