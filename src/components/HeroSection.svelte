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
    <header class="absolute top-0 inset-x-0 z-20 flex justify-end items-center gap-5 px-6 py-5">
        <a href="https://www.instagram.com/facetherapie" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-white/80 hover:text-white transition">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@tftkabonj6g" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="text-white/80 hover:text-white transition">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        </a>
    </header>

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