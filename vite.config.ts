/*
 * @Description: 
 * @Author: tianchi
 * @Date: 2023-06-28 22:02:14
 * @LastEditTime: 2024-05-27 19:27:55
 */
import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'; // make sure to import it
import { getBasePath } from "./Configartion"
// import { visualizer } from 'rollup-plugin-visualizer';
console.log(process.env)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/CarbonFootprint/gov/' : '/CarbonFootprint/',

  build: {
    // outDir: 'build/client'
    outDir: 'dist',
    // assetsDir: 'static',
    // target:["es2015","edge15"],、
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${resolve('src/styles/index.less')}";`,
        },
        javascriptEnabled: true,
        // additionalData: `@import "${resolve(__dirname, '/src/global.less')}`,
        // additionalData: `@import "${path.resolve(__dirname, 'src/global.less')}";`,
      }
    }
  },
  define: {
    'process.env': {
      PROD: 0,
      ...process.env,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: "http://121.36.6.187:8765/",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: false
    }
  }
})