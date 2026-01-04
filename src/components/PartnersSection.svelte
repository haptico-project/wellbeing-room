<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface PartnerItem { name: string; role: string; url: string; description: string; logo: string; }

  // Propsの定義
  export let partners: PartnerItem[];
  export let bgColorClass: string = 'bg-white';

  // Scroll Reveal 関数
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

<SectionLayout {bgColorClass}>
    <h2 class="text-2xl md:text-3xl font-light text-center mb-16" use:reveal>
        パートナー企業
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        {#each partners as p, i}
            <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block p-6 rounded-3xl bg-[#F7FAFC] shadow hover:opacity-90 transition-opacity"
                    use:reveal={{ delay: i * 120 }}
            >
                <div class="w-full max-w-[360px] mx-auto mb-4">
                    <img
                            src={p.logo}
                            alt={p.name}
                            class="w-full h-auto object-contain"
                    />
                </div>

                <h3 class="text-lg font-medium text-[#0F3D47] mb-1">
                    {p.name} 様
                </h3>

                <p class="text-xs text-[#1B2A3C]/70 mb-2">
                    {p.role}
                </p>

                <p class="text-sm text-[#1B2A3C] leading-relaxed">
                    {p.description}
                </p>
            </a>
        {/each}
    </div>
</SectionLayout>