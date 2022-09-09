import { defineConfig, PluginOption } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const IS_BUILD = command === 'build' // 是否是打包

  let plugins: PluginOption[] = [
    react(),
  ]

  if (IS_BUILD) {
    plugins = [
      ...plugins,
      visualizer(), // 打包分析，可额外配置参数
    ]
  }

  return {
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src'),
      }
    },
    plugins,
    server: {
      port: 8080
    }
  }
})
