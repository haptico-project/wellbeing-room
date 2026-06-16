<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';
  import CheckoutService from '../domains/checkoutService'
  import type { AxiosError } from 'axios';

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
    oneTimePriceIds?: string[];
  }

  // Propsの定義
  export let plans: PlanItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';
  export let paddingClass: string = 'py-44';

  // 🔴 必須の追加: agencyCodeをPropsとして公開
  export let agencyCode: string = '';

  const fixedPortalShopId = 'acct_1QhJkZPo9yD7PttV';
  let portalMailAddress = '';
  let isPortalLoading = false;
  let portalError = '';

  // 決済ボタンの連打防止用：処理中のプランの priceId を保持
  let checkoutLoadingPriceId: string | null = null;

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('mail_address')) {
    portalMailAddress = searchParams.get('mail_address') || '';
  }

  // =========================================================
  // 🔴 決済処理ロジック
  // =========================================================
  const checkout = (plan: PlanItem) => {
    // すでにいずれかの決済処理が進行中なら何もしない（連打防止）
    if (checkoutLoadingPriceId !== null) {
      return;
    }

    let useAgencyCode = agencyCode;

    // プラン固有のコードがあればそれを優先
    if (plan.agency_code) {
      useAgencyCode = plan.agency_code;
    }

    // 販売店舗コードが設定されていない場合、プロンプトで入力させる
    if (!useAgencyCode) {
      // Svelteのリアクティビティを考慮し、ローカル変数ではなくexport letされたagencyCodeを更新する
      const inputCode = window.prompt("販売店舗コードを入力してください。", "") || '';
      if (!inputCode) {
        // ユーザーがキャンセルまたは何も入力しなかった場合
        return;
      }
      agencyCode = inputCode; // agencyCodeを更新
      useAgencyCode = agencyCode;
    }

    // 決済ページ準備中の状態に切り替え（ボタンを無効化＆スピナー表示）
    checkoutLoadingPriceId = plan.priceId;

    CheckoutService.checkouForPaymanage(plan.priceId, useAgencyCode, true, plan.oneTimePriceIds || [])
      .then((response) => {
        if (response.data) {
          const url = response.data as string;
          // このまま決済ページへ遷移するため、ローディング状態は維持する
          window.location.assign(url);
        } else {
          throw new Error()
        }
      })
      .catch((e) => {
        console.error('決済ページの表示に失敗しました:', e);
        alert('決済ページの表示に失敗しました。\n販売店舗コードに誤りがないかご確認ください。');
        // 失敗時のみ再操作できるよう状態を戻す
        checkoutLoadingPriceId = null;
      });
  }

  const openCancelPortal = () => {
    portalError = '';
    const trimmedMailAddress = portalMailAddress.trim();
    if (!trimmedMailAddress) {
      portalError = 'mail_address を入力してください。';
      return;
    }

    isPortalLoading = true;
    CheckoutService.getSubscriptionPortalUrl(fixedPortalShopId, trimmedMailAddress, window.location.href)
      .then((response) => {
        const url = response.data as string;

        if (typeof url === 'string' && url.length > 0) {
          window.location.assign(url);
          return;
        }
        throw new Error();
      })
      .catch((e) => {
        console.error('解約ポータルの表示に失敗しました:', e);
        const status = (e as AxiosError)?.response?.status;

        if (status === 400) {
          portalError = '入力内容が不足しています。メールアドレスをご確認ください。';
          return;
        }
        if (status === 404) {
          portalError = '該当するご契約情報が見つかりませんでした。メールアドレスをご確認ください。';
          return;
        }
        portalError = '解約ページの表示に失敗しました。しばらくしてから再度お試しください。';
      })
      .finally(() => {
        isPortalLoading = false;
      });
  };

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

    <p class="text-center -mt-16 mb-12" use:reveal={{ delay: 60 }}>
        <a href="#subscription-cancel" class="text-sm text-[#0F3D47]/75 underline underline-offset-4 hover:text-[#0F3D47] transition">
            ご契約中の方の解約手続きはこちら
        </a>
    </p>

    <div class="grid grid-cols-1 gap-12 max-w-xl mx-auto">
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
                                disabled={checkoutLoadingPriceId !== null}
                                aria-busy={checkoutLoadingPriceId === p.priceId}
                                class="inline-flex items-center justify-center gap-2 w-full max-w-xs px-8 py-3 rounded-full bg-[#0F3D47] text-white font-medium tracking-wider hover:bg-[#0c3139] transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {#if checkoutLoadingPriceId === p.priceId}
                                <span class="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true"></span>
                                決済ページを準備中...
                            {:else}
                                今すぐ申し込む
                            {/if}
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

    <div id="subscription-cancel" class="max-w-xl mx-auto mt-12 rounded-3xl border border-[#0F3D47]/10 bg-white px-8 py-8 shadow-[0_12px_32px_rgba(15,61,71,0.08)]" use:reveal={{ delay: 80 }}>
        <div class="border-b border-[#0F3D47]/10 pb-5">
            <p class="text-xs tracking-[0.14em] text-[#0F3D47]/65 mb-2">ご契約者さま専用</p>
            <h3 class="text-xl text-[#0F3D47]">解約手続き</h3>
            <p class="mt-2 text-sm leading-relaxed text-[#1B2A3C]/75">
                ご契約メールアドレスを入力すると、専用ページへ移動します。
            </p>
        </div>

        <div class="mt-5">
            <label class="block">
                <span class="block text-xs text-[#1B2A3C]/75 mb-2">ご契約メールアドレス</span>
                <input
                        type="email"
                        bind:value={portalMailAddress}
                        placeholder="user@example.com"
                        class="w-full rounded-xl border border-[#0F3D47]/20 bg-white px-4 py-3 text-sm text-[#1B2A3C] placeholder:text-[#1B2A3C]/35 focus:outline-none focus:ring-2 focus:ring-[#0F3D47]/25 focus:border-[#0F3D47]/35 transition"
                />
            </label>
        </div>

        {#if portalError}
            <p class="mt-4 text-sm text-red-600 leading-relaxed">{portalError}</p>
        {/if}

        <div class="mt-6 flex items-center gap-3 flex-wrap">
            <button
                    on:click={openCancelPortal}
                    disabled={isPortalLoading}
                    class="w-full md:w-auto px-8 py-3 rounded-full border border-[#0F3D47]/30 bg-[#0F3D47] text-white font-medium tracking-wider hover:bg-[#0c3139] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {#if isPortalLoading}
                    解約ページを準備中...
                {:else}
                    解約ページへ進む
                {/if}
            </button>
            <p class="text-xs text-[#1B2A3C]/60">お支払い方法の確認・変更も同ページで行えます。</p>
        </div>
    </div>
</SectionLayout>
