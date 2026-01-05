import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';

const isProdPages = process.env.DEPLOY_TARGET === 'gh-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: '200.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: isProdPages ? '/wellbeing-room' : ''
    },
    prerender: {
      // 未クロールルートのエラー処理を制御
      handleUnseenRoutes: ({ routeId, url }) => {
        // /[agencyCode] ルートでの失敗を無視する
        if (routeId.startsWith('/[agencyCode]')) {
          console.warn(`Ignoring route during prerender: ${routeId}`);
          return 'ignore';
        }
        // その他の未クロールルートはエラーにする
        return 'error';
      }
    }
    // paths: {
    // 	base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    // }
  }
};

export default config;
