<script lang="ts">
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

<section class="py-40 bg-[#0F3D47] text-center px-6 text-white">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-light mb-6" use:reveal>
            ただ、いるだけで整う空間を、あなたの場所にも。
        </h2>

        <p
                class="max-w-2xl mx-auto text-sm md:text-base text-white/80 mb-10 leading-relaxed"
                use:reveal={{ delay: 120 }}
        >
            オフィス、ショールーム、ホテル、医療・ケア施設、ペット向けスペースなど。
            Wellbeing Room の導入やコラボレーションについて、お気軽にご相談ください。
        </p>

        <button
                class="px-10 py-4 bg-white text-[#0F3D47] rounded-md text-sm md:text-base tracking-wide hover:bg-emerald-50 transition"
                use:reveal={{ delay: 200 }}
        >
            導入・体験について問い合わせる
        </button>
    </div>
</section>