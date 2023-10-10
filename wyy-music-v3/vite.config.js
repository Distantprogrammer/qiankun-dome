import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  css: {
    preprocessorOptions: {
        less: {
          // 全局less基础变量
            modifyVars: {
                hack: `true; @import (reference) "./src/styles/base.less";`,
            },
            javascriptEnabled: true,
        },
    },
}
})
