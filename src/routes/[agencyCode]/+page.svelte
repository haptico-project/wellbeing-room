<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  export const prerender = false;

  onMount(() => {
    // 現在のパス全体を取得（例: /wellbeing-room/agency-code/）
    const currentPath = $page.url.pathname;

    // 1. ベースパス（/repo-nameなど）を取り除く
    // これにより、SvelteKitが認識する相対パス（/agency-code/）が得られる
    const pathAfterBase = currentPath.startsWith(base)
      ? currentPath.substring(base.length)
      : currentPath;

    // 2. スラッシュを削除し、空でないセグメントに分割
    const segments = pathAfterBase.split('/').filter(s => s.length > 0);

    // 3. 末尾のセグメントを抽出
    const agencyCode = segments.length > 0 ? segments[segments.length - 1] : null;

    // 4. agencyCodeが抽出され、かつ、そのパスがトップページ（/）でない場合のみ処理を実行
    if (agencyCode && pathAfterBase !== '/') {
      console.log(`Agency Code Found: ${agencyCode}. Redirecting...`);

      // 抽出したセグメントをクエリパラメータに設定し、トップページ（/）にリダイレクト
      // { replaceState: true } でブラウザの履歴を上書きし、戻るボタンで前のページに戻れないようにする
      goto(`/?agencyCode=${encodeURIComponent(agencyCode)}`, { replaceState: true });
    }
  });

  // Propsの型定義 (元のコードで$lib/typesからインポートされていると想定)
  interface CtaItem { label: string; primary: boolean; href: string; }

  // Propsの定義
  export let image: string;
</script>