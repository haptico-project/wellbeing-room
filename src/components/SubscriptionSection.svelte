<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';
  import CheckoutService from '../domains/checkoutService'

  // Propsの型定義を更新
  interface PlanItem {
    name: string;
    price: string;
    initFee: string; // 追加
    priceId: string; // 追加
    desc: string;
    features: string[];
    popular: boolean;
    active: boolean; // 追加
    agency_code?: string;
  }

  // Propsの定義
  export let plans: PlanItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';
  export let paddingClass: string = 'py-44';

  // 🔴 必須の追加: agencyCodeをPropsとして公開
  export let agencyCode: string = '';

  // =========================================================
  // 🔴 決済処理ロジック
  // =========================================================
  const checkout = (plan: PlanItem) => {
    let useAgencyCode = agencyCode;

    // プラン固有のコードがあればそれを優先
    if (plan.agency_code) {
      useAgencyCode = plan.agency_code;
    }

    // 代理店コードが設定されていない場合、プロンプトで入力させる
    if (!useAgencyCode) {
      // Svelteのリアクティビティを考慮し、ローカル変数ではなくexport letされたagencyCodeを更新する
      const inputCode = window.prompt("代理店コードを入力してください。", "") || '';
      if (!inputCode) {
        // ユーザーがキャンセルまたは何も入力しなかった場合
        return;
      }
      agencyCode = inputCode; // agencyCodeを更新
      useAgencyCode = agencyCode;
    }

    CheckoutService.checkouForPaymanage(plan.priceId, useAgencyCode, true)
      .then((response) => {
        if (response.data) {
          const url = response.data as string;
          window.location.assign(url);
        } else {
          throw new Error()
        }
      })
      .catch((e) => {
        console.error('決済ページの表示に失敗しました:', e);
        alert('決済ページの表示に失敗しました。\n販売店コードに誤りがないかご確認ください。');
      });
  }

  // Scroll Reveal 関数 (省略なし)
  function reveal(node: HTMLElement, { delay = 0 } = {}) {
    node.style.opacity = '0';
    node.style.transform = 'translateY(24px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.transition = `
                        opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                        transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms
                    `;
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
  }
</script>

<SectionLayout {bgColorClass} {paddingClass}>
    <h2 class="text-3xl md:text-4xl font-light text-center mb-24" use:reveal>
        サブスクリプション
    </h2>

    <div class="grid grid-cols-2 gap-12 max-w-xl mx-auto">
        {#each plans as p}
            <div class="relative rounded-3xl bg-white border border-black/5 px-10 py-12 shadow-lg" use:reveal>
                {#if p.popular}
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F3D47] text-white text-xs px-4 py-1 rounded-full">
                        Recommended
                    </div>
                {/if}

                <h3 class="text-2xl font-light text-center mb-2">{p.name}</h3>
                <p class="text-4xl text-[#0F3D47] text-center mb-4">{p.price}</p>

                <p class="text-sm text-center text-[#1B2A3C]/70 mb-2">初期費用: {p.initFee}</p>

                <p class="text-sm text-center text-[#1B2A3C] mb-8">{p.desc}</p>

                <ul class="space-y-3 text-sm border-b border-black/10 pb-8 mb-8">
                    {#each p.features as f}
                        <li class="flex items-start gap-3 text-[#1B2A3C]">
                            <span class="text-emerald-600 mt-[2px]">●</span>
                            {f}
                        </li>
                    {/each}
                </ul>

                <div class="text-center">
                    {#if p.active}
                        <button
                                on:click={() => checkout(p)}
                                class="w-full max-w-xs px-8 py-3 rounded-full bg-[#0F3D47] text-white font-medium tracking-wider hover:bg-[#0c3139] transition shadow-md"
                        >
                            今すぐ申し込む
                        </button>
                    {:else}
                        <button
                                disabled
                                class="w-full max-w-xs px-8 py-3 rounded-full bg-gray-300 text-gray-600 font-medium tracking-wider cursor-not-allowed"
                        >
                            受付休止中
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</SectionLayout>