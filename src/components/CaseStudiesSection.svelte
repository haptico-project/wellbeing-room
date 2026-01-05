<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import 'swiper/css';
  import 'swiper/css/pagination';
  // @ts-ignore
  import { Pagination } from 'swiper';

  // Propsの型定義
  interface CaseStudyItem { title: string; body: string; images: string[]; }

  // Propsの定義
  export let id: string;
  export let caseStudies: CaseStudyItem[];
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

<style>
    /* Swiper関連のスタイルは親から引き継ぐか、ここに再定義が必要です */
    .swiper {
        width: auto;
        overflow: hidden;
    }
    .swiper-wrapper {
        width: 100%;
    }
    /* スライド内の画像サイズは親コンポーネントのCSS設定に依存 */
</style>

<SectionLayout {id} {bgColorClass}>
    <h2 class="text-3xl md:text-4xl font-light text-center mb-12" use:reveal>
        導入事例
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        {#each caseStudies as c, i}
            <article class="p-6 rounded-3xl bg-white shadow border border-black/5" use:reveal={{ delay: i * 120 }}>

                <div class="relative w-full overflow-hidden rounded-xl mb-4">
                    <Swiper
                            class="w-full"
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            spaceBetween={20}
                            slidesPerView={1}
                    >
                        {#each c.images as img}
                            <SwiperSlide>
                                <img
                                        src={img}
                                        alt={c.title}
                                        class="w-full h-[240px] md:h-[370px] object-cover"
                                />
                            </SwiperSlide>
                        {/each}
                    </Swiper>
                </div>

                <h3 class="text-lg font-medium text-[#0F3D47] mb-2 mt-4">
                    {c.title}
                </h3>
                <p class="text-sm text-[#1B2A3C] leading-relaxed">
                    {c.body}
                </p>

            </article>
        {/each}
    </div>
</SectionLayout>