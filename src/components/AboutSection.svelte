<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';

  // Propsの定義
  export let id: string;
  export let title: string;
  export let body: string;
  export let youtubeId: string;
  export let bgColorClass: string = 'bg-white'; // 呼び出し元で指定可能

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

<SectionLayout {id} {bgColorClass}>
    <div class="grid md:grid-cols-2 gap-14 items-center">
        <div>
            <h2 class="text-3xl md:text-4xl font-light text-[#0A1A2F] mb-8" use:reveal>
                {title}
            </h2>

            <p
                    class="text-lg text-[#1B2A3C] whitespace-pre-line leading-relaxed"
                    use:reveal={{ delay: 120 }}
            >
                {body}
            </p>
        </div>

        <div class="w-full" use:reveal={{ delay: 200 }}>
            <div class="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe
                        class="w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="Wellbeing Room Video"
                        allowfullscreen
                />
            </div>
        </div>
    </div>
</SectionLayout>