import { defineConfig, PluginOption } from 'vite'
import path from 'path'
import { readFileSync } from 'fs'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer' // 打包分析
import dynamicImport from 'vite-plugin-dynamic-import' // 动态导入
import vitePluginImp from 'vite-plugin-imp' // 按需引入
import lessToJs from 'less-vars-to-js' // less转为js

// 读取antd主题色样式
const themeVariables = lessToJs(
  readFileSync(path.resolve(__dirname, './src/assets/less/variables.less'), 'utf-8')
)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const IS_BUILD = command === 'build' // 是否是打包

  let plugins: PluginOption[] = [
    react({
      jsxRuntime: 'classic', // 退出默认jsx-runtime
    }),
    // 动态导入
    dynamicImport(),
    // 按需引入【antd】
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`
        }
      ]
    })
  ]

  if (IS_BUILD) {
    plugins = [
      ...plugins,
      // visualizer(), // 打包分析，可额外配置参数
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
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 支持内联javascript
          modifyVars: themeVariables, // 重写antd的less变量，定制样式
          additionalData: `@import "${path.resolve(__dirname, './src/assets/less/mixins.less')}";` // 配置less全局环境变量
        }
      }
    },
    // 修改本地开发配置
    server: {
      port: 8080
    },
    // 配置自定义jsx-runtime，将使用clx合并className，像写vue一样方便地写react的className
    esbuild: {
      jsxFactory: 'createElement',
      jsxFragment: 'Fragment',
      jsxInject: `import { createElement, Fragment } from 'react-auto-classnames'`,
    },
  }
})
