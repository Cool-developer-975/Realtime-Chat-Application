import { resolve } from 'path';
import { defineConfig } from 'vite';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: 'public',
  base: '',
  build: {
    outDir: '../../Backend/public/',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        signup: resolve(__dirname, 'public/signup.html'),
        chat:resolve(__dirname, 'public/chat.html'),
        room:resolve(__dirname,'public/userpage.html'),
        joinRoom:resolve(__dirname,'public/joinRoom.html'),
        createRoom:resolve(__dirname,'public/createRoom.html'),
      },
    },
  },
  plugins:[
    postcss({
      plugins:[
        autoprefixer({
          overrideBrowserslist:['last 2 versions', 'not ie <= 11'],
        }),
        cssnano({
          preset:['default'],
        }),
      ]
    })
  ]
});

