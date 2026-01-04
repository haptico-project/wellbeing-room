<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface PlanItem { name: string; price: string; desc: string; features: string[]; popular: boolean; }

  // Propsの定義
  export let plans: PlanItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';
  export let paddingClass: string = 'py-44';

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

<SectionLayout {bgColorClass} {paddingClass}>
    <h2 class="text-3xl md:text-4xl font-light text-center mb-24" use:reveal>
        Personal Plan
    </h2>

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
                <p class="text-sm text-center text-[#1B2A3C] mb-10">{p.desc}</p>

                <ul class="space-y-3 text-sm">
                    {#each p.features as f}
                        <li class="flex items-start gap-3 text-[#1B2A3C]">
                            <span class="text-emerald-600 mt-[2px]">●</span>
                            {f}
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</SectionLayout>