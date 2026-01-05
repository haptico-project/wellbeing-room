<script lang="ts">
  // Propsの型定義 (元のコードで$lib/typesからインポートされていると想定)
  interface CtaItem { label: string; primary: boolean; href: string; }

  // Propsの定義
  export let image: string;
  export let kicker: string;
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

<section class="relative min-h-[100svh] flex items-center justify-center px-6 overflow-hidden">
    <div
            class="absolute inset-0 bg-cover bg-center scale-105"
            style="background-image:url('{image}')"
    />

    <div class="absolute inset-0 bg-black/50" />

    <div class="relative max-w-4xl mx-auto text-center">

        <p class="tracking-[0.2em] text-xl md:text-2xl text-white mb-10 font-light font-serif" use:reveal>
            <span>{kicker}</span>
        </p>

        <h1
                class="text-5xl md:text-7xl lg:text-8xl font-light text-white whitespace-pre-line leading-snug tracking-wide font-serif"
                use:reveal={{ delay: 60 }}
        >
            <span>{title}</span>
        </h1>

        <p
                class="mt-8 text-2xl md:text-3xl text-white whitespace-pre-line leading-loose font-serif"
                use:reveal={{ delay: 140 }}
        >
            {subtitle}
        </p>

        <div class="mt-24 flex flex-wrap gap-4 justify-center" use:reveal={{ delay: 240 }}>
            {#each cta as c}
                {#if c.primary}
                    <a
                            href={c.href}
                            class="px-10 py-4 rounded-lg bg-white text-[#0F3D47] text-lg tracking-wider hover:bg-gray-100 transition font-sans"
                    >
                        {c.label}
                    </a>
                {:else}
                    <a
                            href={c.href}
                            class="px-10 py-4 rounded-lg border border-white text-white text-lg tracking-wider hover:bg-white/10 transition font-sans"
                    >
                        {c.label}
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</section>