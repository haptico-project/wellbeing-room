<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface PackageItem {
    title: string;
    body: string;
    image: string;
  }

  // Propsの定義
  export let packageItems: PackageItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';

  // Scroll Reveal 関数 (省略なし)
  function reveal(node: HTMLElement, {delay = 0} = {}) {
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
      {threshold: 0.15}
    );

    observer.observe(node);
  }
</script>

<SectionLayout {bgColorClass}>
    <h2 class="text-4xl md:text-5xl font-light text-center mb-20" use:reveal>
        必要なものがすべて揃ったパッケージ
    </h2>

    <div class="space-y-32"> {#each packageItems as item, i}
        <div
                class="grid md:grid-cols-2 gap-16 items-center"
                class:md:grid-flow-col-dense={i % 2 !== 0}
        >
            <div
                    class="order-2 md:order-1"
                    class:md:order-2={i % 2 !== 0}
                    use:reveal={{ delay: i * 150 }}
            >
                <h3 class="text-3xl md:text-4xl font-light text-[#0A1A2F] mb-6 leading-snug">
                    {item.title}
                </h3>

                <p class="text-lg text-[#1B2A3C] whitespace-pre-line leading-relaxed">
                    {item.body}
                </p>
            </div>

            <div
                    class="order-1 md:order-2"
                    class:md:order-1={i % 2 !== 0}
                    use:reveal={{ delay: i * 150 + 100 }}
            >
                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <img
                            src={item.image}
                            alt={item.title}
                            class="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    {/each}
    </div>
</SectionLayout>