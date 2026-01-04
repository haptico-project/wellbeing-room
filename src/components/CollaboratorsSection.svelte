<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface CollaboratorItem { name: string; role: string; affiliation: string; body: string; image: string; }

  // Propsの定義
  export let collaborators: CollaboratorItem[];
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
        コラボレーター
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        {#each collaborators as c, i}
            <article
                    class="p-6 rounded-3xl bg-[#F7FAFC] shadow"
                    use:reveal={{ delay: i * 120 }}
            >
                <div
                        class="w-full max-w-[480px] mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-black mb-4"
                >
                    <img
                            src={c.image}
                            class="w-full h-full object-contain"
                            alt={c.name}
                    />
                </div>

                <h3 class="text-lg font-medium text-[#0F3D47] mb-1">
                    {c.name}
                </h3>
                {#if c.role}
                    <p class="text-xs text-[#1B2A3C]/70 mb-1">
                        {c.role}
                    </p>
                {/if}
                {#if c.affiliation}
                    <p class="text-xs text-[#1B2A3C]/70 mb-1">
                        {c.affiliation}
                    </p>
                {/if}
                <p class="text-sm text-[#1B2A3C] leading-relaxed mt-2">
                    {c.body}
                </p>
            </article>
        {/each}
    </div>
</SectionLayout>