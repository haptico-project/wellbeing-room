<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの型定義
  interface TechnologyItem { title: string; body: string; image: string; }

  // Propsの定義
  export let technologies: TechnologyItem[];
  export let bgColorClass: string = 'bg-[#F7FAFC]';
  export let paddingClass: string = 'py-24';

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
    <h2 class="text-3xl md:text-4xl font-light text-center mb-16" use:reveal>
        Tactile DX Lab. 技術紹介
    </h2>

    <p class="md:mx-16 font-light text-center mb-16" use:reveal>
        Tactile DX Lab. は、世界に先駆けて触覚デジタルトランスフォーメーション（触覚DX）技術を開発・展開している研究集団です。
        名古屋大学の鈴木泰博を中心に、世界トップクラスの研究者、エンジニア、専門技術者、デザイナーなどが集い、専門分野や組織の枠を超えて協働しています。
        「森の部屋」に導入された技術は、こうした多様な知と技術の結晶として生まれました。
        Wellbeing Room で使用されている技術をご紹介しましょう。
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {#each technologies as t, i}
            <div
                    class="bg-white rounded-2xl shadow border border-black/5 p-6 flex flex-col"
                    use:reveal={{ delay: i * 80 }}
            >
                <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img src={t.image} alt={t.title} class="w-full h-full object-cover"/>
                </div>

                <h3 class="text-lg font-medium text-[#0A1A2F] mb-2">
                    {t.title}
                </h3>

                <p class="text-sm text-[#1B2A3C] leading-relaxed whitespace-pre-line flex-1">
                    {t.body}
                </p>
            </div>
        {/each}
    </div>
</SectionLayout>