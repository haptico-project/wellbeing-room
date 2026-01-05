<script lang="ts">
  import SectionLayout from './SectionLayout.svelte';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import 'swiper/css';
  import 'swiper/css/pagination';
  // @ts-ignore
  import { Pagination } from 'swiper';

  // Propsの型定義
  interface PetsData { title: string; body: string; images: string[]; }

  // Propsの定義
  export let pets: PetsData;
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
</style>

<SectionLayout {bgColorClass}>
    <div class="grid md:grid-cols-2 gap-14 items-center">
        <div>
            <span class="text-xs uppercase tracking-widest text-[#0F3D47]/70 block mb-3" use:reveal>
                Related Product
            </span>
            <h2 class="text-2xl md:text-3xl font-light text-[#0A1A2F] mb-6" use:reveal={{ delay: 60 }}>
                {pets.title}
            </h2>

            <p class="text-lg text-[#1B2A3C] whitespace-pre-line leading-relaxed" use:reveal={{ delay: 120 }}>
                {pets.body}
            </p>
        </div>

        <div class="relative overflow-hidden rounded-2xl" use:reveal={{ delay: 200 }}>
            <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    class="w-full"
            >
                {#each pets.images as img}
                    <SwiperSlide><img src={img} alt="Wellbeing Room for Animals" class="w-full object-cover"/></SwiperSlide>
                {/each}
            </Swiper>
        </div>
    </div>
</SectionLayout>