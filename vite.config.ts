import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/image-rights-promotion-flow-v1/' : '/',
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      'styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
}))
