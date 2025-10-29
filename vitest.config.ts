import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/constants.ts', 'src/types.ts', 'src/index.ts']
    },
  },
})