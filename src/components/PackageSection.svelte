<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // 型定義（元のファイルから適切に抽出するか、types.tsを作成してください）
  interface PackageItem {
    title: string;
    body: string;
    image: string;
  }

  // Propsの定義
  export let packageItems: PackageItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]'; // 呼び出し元で指定可能

  // Scroll Reveal 関数 (元のファイルからコピー)
  function reveal(node: HTMLElement, {delay = 0} = {}) {
    // ... reveal関数の実装 ...
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
    <h2 class="text-3xl md:text-4xl font-light text-center mb-12" use:reveal>
        必要なものがすべて揃ったパッケージ
    </h2>

    <div class="grid md:grid-cols-3 gap-10">
        {#each packageItems as item, i}
            <article
                    class="p-6 rounded-3xl bg-white shadow border border-black/5"
                    use:reveal={{ delay: i * 120 }}
            >
                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img src={item.image} alt={item.title} class="w-full h-full object-cover"/>
                </div>

                <h3 class="text-lg font-medium text-[#0F3D47] mb-2">{item.title}</h3>
                <p class="text-sm text-[#1B2A3C] leading-relaxed">{item.body}</p>
            </article>
        {/each}
    </div>
</SectionLayout>