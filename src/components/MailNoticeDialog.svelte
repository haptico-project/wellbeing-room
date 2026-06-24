<!-- 決済・解約など、バックエンドから通知メールが送られる導線で「haptico.co.jp から通知メールが届く」旨を案内する小ダイアログ。
     決済3フロント（my-esthe / wellbeing-room / wellbeing-room-pet）で共通利用する想定の自己完結コンポーネント。 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let title = 'メール通知について';
  export let message = 'haptico.co.jp より、お手続きに関する通知メールをお送りします。';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');
</script>

{#if open}
  <div
    class="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
  >
    <div class="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-[0_24px_60px_rgba(15,61,71,0.25)]">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D47]/10">
        <span class="text-2xl text-[#0F3D47]" aria-hidden="true">✉</span>
      </div>
      <h2 class="mt-5 text-xl text-[#0F3D47]">{title}</h2>
      <p class="mt-4 whitespace-pre-line text-sm leading-7 text-[#1B2A3C]/80">{message}</p>
      <button
        class="mt-6 w-full rounded-full bg-[#0F3D47] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#0c3139]"
        on:click={close}
      >
        閉じる
      </button>
    </div>
  </div>
{/if}
