<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface SceneItem { title: string; body: string; }

  // Propsの定義
  export let scenes: SceneItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';

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
    <h2 class="text-3xl md:text-4xl font-light text-center mb-12" use:reveal>
        主な活用シーン
    </h2>

    <div class="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {#each scenes as s, i}
            <div class="p-6 rounded-2xl bg-[#F7FAFC] shadow" use:reveal={{ delay: i * 120 }}>
                <h3 class="text-lg font-medium text-[#0F3D47] mb-2">{s.title}</h3>
                <p class="text-sm text-[#1B2A3C]">{s.body}</p>
            </div>
        {/each}
    </div>
</SectionLayout>