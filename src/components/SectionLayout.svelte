<script lang="ts">

  /** 適用するCSSクラス (bg-white, bg-[#F7FAFC] など) */
  export let bgColorClass: string = 'bg-white';

  /** セクションID (オプション) */
  export let id: string | undefined = undefined;

  /** 上下のパディング (デフォルトは py-32) */
  export let paddingClass: string = 'py-32';

  // 🔴 修正: Props名を 'class' から 'customClass' に変更
  /** 追加のクラス */
  export let customClass: string = '';
</script>

<section
        {id}
        class={`px-6 ${paddingClass} ${bgColorClass} ${customClass}`}
>
    <div class="max-w-6xl mx-auto">
        <slot />
    </div>
</section>