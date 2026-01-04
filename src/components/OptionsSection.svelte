<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface OptionItem { title: string; body: string; image: string; }

  // Propsの定義
  export let options: OptionItem[];
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
    <h2 class="text-3xl md:text-4xl font-light text-center mb-12" use:reveal>
        選べる Wellbeing アイテム
    </h2>

    <div class="grid md:grid-cols-4 gap-10">
        {#each options as opt, i}
            <article
                    class="p-6 rounded-3xl bg-[#F7FAFC] shadow border border-black/5"
                    use:reveal={{ delay: i * 120 }}
            >
                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img src={opt.image} alt={opt.title} class="w-full h-full object-cover"/>
                </div>

                <h3 class="text-lg font-medium text-[#0F3D47] mb-2">{opt.title}</h3>
                <p class="text-sm text-[#1B2A3C] leading-relaxed">{opt.body}</p>
            </article>
        {/each}
    </div>
</SectionLayout>