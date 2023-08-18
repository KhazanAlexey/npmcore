/// <reference types="vitest" />
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode}:{ mode:any }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return  defineConfig({
    cacheDir: './node_modules/.vite/myreactapp',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [svgr(),react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@awesome-library': path.resolve(__dirname, 'awesome-library')
      }
    },

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    test: {
      globals: true,
      cache: {
        dir: './node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  });

}

