import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import dtsPlugin from "vite-plugin-dts";
import legacy from "@vitejs/plugin-legacy";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vueJsx(),
    vue(),
    dtsPlugin(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    //   polyfills: ["es.promise.finally", "es/map", "es/set"],
    // }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
    watch: {
      include: ["src/**", "vite.config.js", "package.json"],
    },
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      // external: ["vue"],
      input: ["src/index.ts"],
      output: [
        {
          // 在 UMD 构建模式下为这些外部化的依赖
          // 提供一个全局变量
          globals: {
            vue: "Vue",
          },
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
          dir: "dist/lib",
        },
        {
          // 在 UMD 构建模式下为这些外部化的依赖
          // 提供一个全局变量
          globals: {
            vue: "Vue",
          },
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
          dir: "dist/es",
        },
      ],
    },
  },
});
