<script lang="ts">
  // Propsの型定義 (元のコードで$lib/typesからインポートされていると想定)
  interface CtaItem { label: string; primary: boolean; href: string; }

  // Propsの定義
  export let image: string;
  export let kicker: string; // kickerは使用されていませんが、定義は維持
  export let title: string;
  export let subtitle: string;
  export let cta: CtaItem[];

  // Scroll Reveal 関数 (元のファイルからコピー)
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

<section class="relative min-h-screen min-h-[100svh] flex items-center justify-center px-6 overflow-hidden">
    <div
            class="absolute inset-0 bg-cover bg-center scale-105"
            style="background-image:url('{image}')"
    />

    <div class="absolute inset-0 bg-black/50" />

    <div class="relative max-w-4xl mx-auto text-center">

        <h1
                class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white whitespace-pre-line leading-snug tracking-wide font-serif"
                use:reveal={{ delay: 60 }}
        >
            {title}
        </h1>

        <p
                class="mt-6 text-2xl md:text-3xl text-white whitespace-pre-line leading-loose font-serif"
                use:reveal={{ delay: 140 }}
        >
            {subtitle}
        </p>

        <div class="mt-12 flex flex-col gap-y-4 items-center mx-auto max-w-xs" use:reveal={{ delay: 240 }}>
            {#each cta as c}
                {#if c.primary}
                    <a
                            href={c.href}
                            class="w-full text-center px-10 py-4 rounded-lg bg-white text-[#0F3D47] text-lg tracking-wider hover:bg-gray-100 transition font-sans"
                    >
                        {c.label}
                    </a>
                {:else}
                    <a
                            href={c.href}
                            class="w-full text-center px-10 py-4 rounded-lg border border-white text-white text-lg tracking-wider hover:bg-white/10 transition font-sans"
                    >
                        {c.label}
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</section>