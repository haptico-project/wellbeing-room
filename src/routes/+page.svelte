<script lang="ts">
    import { base } from '$app/paths';
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import 'swiper/css';
    import 'swiper/css/pagination';
    // @ts-ignore
    import { Pagination } from 'swiper';

    /* =========================================================
       image resolver
    ========================================================= */
    const resolveImg = (src: string) => {
        if (!src) return '';
        if (src.startsWith('http')) return src;
        return `${base}${src.startsWith('/') ? src : `/${src}`}`;
    };

    /* =========================================================
       Scroll Reveal
    ========================================================= */
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

    /* =========================================================
       HERO
    ========================================================= */
    const hero = {
        image: resolveImg(
            'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1500,w_2000,f_auto,q_auto/3301372/726187_716584.jpeg'
        ),
        kicker: 'Sound, Touch, and Quiet Wellbeing',
        title: 'ただ、いるだけで整う。\nWellbeing Room',
        subtitle:
            '自然音の立体音響と触覚振動を組み合わせた、次世代型のウェルビーイング空間。短時間でも深い休息と意識の切り替えを実現します。',
        cta: [
            { label: 'Wellbeing Room とは', primary: true, href: '#about' },
            { label: '導入事例を見る', primary: false, href: '#cases' }
        ]
    };

    /* =========================================================
       Wellbeing Roomとは（説明＋YouTube）
    ========================================================= */
    const about = {
        title: 'Wellbeing Room とは',
        body: `Wellbeing Room は、自然音に含まれる低周波成分を抽出し、
それを立体音響と触覚振動として再構成する独自技術から生まれた空間です。

森の中で深呼吸するような、静かで深い休息を日常空間にそのまま持ち込むことを目指しています。
施工工事は不要で、電源さえあればすぐに導入できます。`,
        youtubeId: 'CxbP5grgW5E'
    };

    /* =========================================================
       パッケージ構成
    ========================================================= */
    const packageItems = [
        {
            title: '設置は簡単',
            body:
                'Wellbeing room は、自然音を響かせる立体音響システムとマッサージベッドを含む、必要なものがすべて揃ったオールインワンパッケージ。\n' +
                '大掛かりな工事は不要、通常の電源さえあればちょっとした空間にすぐ設置可能です。小さな空間が、自然の森に包まれるような癒しの体験空間へと変わります。',
            image: resolveImg('/sections/packages/setup.png')
        },
        {
            title: '設置例',
            body: '立体音響\n＋\nコラーゲンマスク\n＋\nボディケア（Dr.AI)。',
            image: resolveImg('/sections/packages/image.gif')
        },
        {
            title: '選べるオプション',
            body:
                'Wellbeing room では、自然音を立体音響システムで体感するだけでなく、音響マッサージを組み合わせて体験することも可能です。\n' +
                '立体音響による空間全体の没入感に加え、美容フェイシャルケアとしてのコラーゲンマスク、ボディケアとしての Dr. AI haru を選択でき、目的や状態に合わせたリラックスを実現します。',
            image: resolveImg('/sections/packages/options.png')
        }
    ];

    /* =========================================================
       オプション一覧
    ========================================================= */
    const options = [
        {
            title: 'フェイシャルケア（コラーゲンマスク）',
            body: '美容ケアとしてのフェイシャルオプション。',
            image: resolveImg('https://placehold.co/600x400?text=Facial')
        },
        {
            title: 'ボディケア（Dr.AI）',
            body: '自然音の低周波を利用したボディケアデバイス。',
            image: resolveImg('https://placehold.co/600x400?text=Bodycare')
        }
    ];

    /* =========================================================
       関連ソリューション：ペット向け
    ========================================================= */
    const pets = {
        title: '関連ソリューション：Wellbeing Room for Animals',
        body: `大切なパートナーたちにも自然の“整える力”を。
人のリラクゼーションや回復に用いられてきたWellbeing Roomの仕組みを動物のために最適化したのが「Wellbeing Room for Animals」です。`,
        images: [
            resolveImg('/sections/pets/img1.png'),
            resolveImg('/sections/pets/img2.png'),
            resolveImg('/sections/pets/img3.png')
        ]
    };

    /* =========================================================
       活用シーン
    ========================================================= */
    const scenes = [
        { title: 'オフィス', body: '短時間でリフレッシュできる休憩スペースとして。' },
        { title: 'ショールーム', body: '来訪者の体験価値を高める空間演出に。' },
        { title: 'ホテル', body: '滞在の質を高めるウェルビーイング体験として。' },
        { title: '医療・ケア施設', body: '不安軽減や休息のサポートに。' },
        { title: 'ペット施設', body: '動物のストレスケアに（関連製品）。' }
    ];

    /* =========================================================
       導入事例
    ========================================================= */
    const caseStudies = [
        {
            title: '加賀電子株式会社 様',
            body: '本社内ジムの一角に Wellbeing Room を導入いただきました。',
            images: [
                resolveImg('/sections/cases/kaga/wbr1.png'),
                resolveImg('/sections/cases/kaga/wbr2.png'),
                resolveImg('/sections/cases/kaga/wbr3.png'),
                resolveImg('/sections/cases/kaga/wbr4.png'),
                resolveImg('/sections/cases/kaga/3dSound.png')
            ]
        },
        {
            title: 'レクサス川口店, Golf Studio f 様',
            body: '店舗内のゴルフサロン・フィットネスで美容を加えた新しいサービスが人気。',
            images: [
                resolveImg('/sections/cases/lexus/fit1.png'),
                resolveImg('/sections/cases/lexus/fit2.png')
            ]
        },
        {
            title: 'ボルボ・カー 千葉みなと店, Golf Studio f 様',
            body: 'フィットネス＋美容のサービスが上質な顧客体験の一環として機能。',
            images: [resolveImg('/sections/cases/volvo/fit1.png')]
        }
    ];

    /* =========================================================
       技術紹介
    ========================================================= */
    const technologies = [
        {
            title: '顔リズム',
            body: '...',
            image: resolveImg('/sections/techs/kaorhythm.png')
        },
        {
            title: 'Dr.AI - HARU',
            body: '...',
            image: resolveImg('/sections/techs/draiharu.png')
        },
        {
            title: 'ポータブル - HARU',
            body: '...',
            image: resolveImg('/sections/techs/portableharu.png')
        },
        {
            title: 'HARU',
            body: '...',
            image: resolveImg('/sections/techs/haru.png')
        },
        {
            title: 'TerraSonic',
            body: '...',
            image: resolveImg('/sections/techs/terrasonic.png')
        }
    ];

    /* =========================================================
       サブスク
    ========================================================= */
    const plans = [
        {
            name: 'Personal',
            price: '¥5,500 / month',
            desc: '個人向け Wellbeing Room の月額プランです。',
            features: ['Wellbeing Room'],
            popular: true
        }
    ];
</script>

<style>
    html, body {
        overflow-x: hidden;
    }

    .swiper {
        width: auto;
        overflow: hidden;
    }

    .swiper-wrapper {
        width: 100%;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

</style>

<!-- =========================================================
     HERO
========================================================= -->
<section class="relative min-h-[100svh] flex items-center px-6 overflow-hidden">
    <div
            class="absolute inset-0 bg-cover bg-center scale-105"
            style="background-image:url('{hero.image}')"
    />
    <div class="absolute inset-0 bg-white/50"/>

    <div class="relative max-w-4xl">
        <p class="uppercase tracking-[0.25em] text-xs text-[#37525a]/70 mb-4" use:reveal>
            {hero.kicker}
        </p>

        <h1
                class="text-4xl md:text-6xl font-light text-[#0A1A2F] whitespace-pre-line leading-tight"
                use:reveal={{ delay: 60 }}
        >
            {hero.title}
        </h1>

        <p
                class="mt-6 text-lg md:text-xl text-[#1B2A3C] whitespace-pre-line leading-relaxed"
                use:reveal={{ delay: 140 }}
        >
            {hero.subtitle}
        </p>

        <div class="mt-12 flex flex-wrap gap-4" use:reveal={{ delay: 240 }}>
            {#each hero.cta as c}
                {#if c.primary}
                    <a
                            href={c.href}
                            class="px-7 py-3 rounded-md bg-[#0F3D47] text-white text-sm tracking-wide hover:bg-[#0c3139]"
                    >
                        {c.label}
                    </a>
                {:else}
                    <a
                            href={c.href}
                            class="px-7 py-3 rounded-md border border-[#0F3D47] text-[#0F3D47] text-sm tracking-wide hover:bg-[#0F3D47]/5"
                    >
                        {c.label}
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</section>

<!-- =========================================================
     ABOUT（説明＋YouTube）
========================================================= -->
<section id="about" class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
            <h2 class="text-3xl md:text-4xl font-light text-[#0A1A2F] mb-8" use:reveal>
                {about.title}
            </h2>

            <p
                    class="text-lg text-[#1B2A3C] whitespace-pre-line leading-relaxed"
                    use:reveal={{ delay: 120 }}
            >
                {about.body}
            </p>
        </div>

        <div class="w-full" use:reveal={{ delay: 200 }}>
            <div class="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe
                        class="w-full h-full"
                        src={`https://www.youtube.com/embed/${about.youtubeId}`}
                        title="Wellbeing Room Video"
                        allowfullscreen
                />
            </div>
        </div>
    </div>
</section>

<!-- =========================================================
     PACKAGE（必要なものがすべて揃ったパッケージ）
========================================================= -->
<section class="py-32 px-6 bg-[#F7FAFC]">
    <div class="max-w-6xl mx-auto">
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
                        <img src={item.image} class="w-full h-full object-cover"/>
                    </div>

                    <h3 class="text-lg font-medium text-[#0F3D47] mb-2">{item.title}</h3>
                    <p class="text-sm text-[#1B2A3C] leading-relaxed">{item.body}</p>
                </article>
            {/each}
        </div>
    </div>
</section>

<!-- =========================================================
     OPTIONS（オプション一覧）
========================================================= -->
<section class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-light text-center mb-12" use:reveal>
            オプション一覧
        </h2>

        <div class="grid md:grid-cols-4 gap-10">
            {#each options as opt, i}
                <article
                        class="p-6 rounded-3xl bg-[#F7FAFC] shadow border border-black/5"
                        use:reveal={{ delay: i * 120 }}
                >
                    <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                        <img src={opt.image} class="w-full h-full object-cover"/>
                    </div>

                    <h3 class="text-lg font-medium text-[#0F3D47] mb-2">{opt.title}</h3>
                    <p class="text-sm text-[#1B2A3C] leading-relaxed">{opt.body}</p>
                </article>
            {/each}
        </div>
    </div>
</section>

<!-- =========================================================
     SCENES（活用シーン）
========================================================= -->
<section class="py-32 px-6 bg-[#F7FAFC]">
    <div class="max-w-6xl mx-auto">
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
    </div>
</section>

<!-- =========================================================
     CASE STUDIES（導入事例・カルーセル）
========================================================= -->
<section id="cases" class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-light text-center mb-12">
            導入事例
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            {#each caseStudies as c, i}
                <article class="p-6 rounded-3xl bg-white shadow border border-black/5">

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

    </div>
</section>

<!-- =========================================================
     TECHNOLOGY（技術紹介）
========================================================= -->
<section class="py-24 px-6 bg-[#F7FAFC]">
    <div class="max-w-6xl mx-auto">

        <h2 class="text-3xl md:text-4xl font-light text-center mb-16" use:reveal>
            Tactile DX Lab. 技術紹介
        </h2>

        <p class="md:mx-16 font-light text-center mb-16" use:reveal>
            Tactile DX Lab. は、世界に先駆けて触覚デジタルトランスフォーメーション（触覚DX）技術を開発・展開している研究集団です。
            名古屋大学の鈴木泰博を中心に、世界トップクラスの研究者、エンジニア、専門技術者、デザイナーなどが集い、専門分野や組織の枠を超えて協働しています。
            「森の部屋」に導入された技術は、こうした多様な知と技術の結晶として生まれました。
            Wellbeing Room で使用されている技術をご紹介しましょう。
        </p>

        <!-- カードグリッド -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {#each technologies as t, i}
                <div
                        class="bg-white rounded-2xl shadow border border-black/5 p-6 flex flex-col"
                        use:reveal={{ delay: i * 80 }}
                >
                    <!-- Image -->
                    <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                        <img src={t.image} class="w-full h-full object-cover"/>
                    </div>

                    <!-- Title -->
                    <h3 class="text-lg font-medium text-[#0A1A2F] mb-2">
                        {t.title}
                    </h3>

                    <!-- Body -->
                    <p class="text-sm text-[#1B2A3C] leading-relaxed whitespace-pre-line flex-1">
                        {t.body}
                    </p>
                </div>
            {/each}
        </div>

    </div>
</section>

<!-- =========================================================
     PARTNERS（パートナー企業）
========================================================= -->
<section class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto">

        <h2 class="text-2xl md:text-3xl font-light text-center mb-16" use:reveal>
            パートナー企業
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            {#each partners as p, i}

                <!-- ★ カード全体をリンク化 -->
                <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block p-6 rounded-3xl bg-[#F7FAFC] shadow hover:opacity-90 transition-opacity"
                        use:reveal={{ delay: i * 120 }}
                >

                    <!-- ロゴ（枠なし・最大サイズ・アスペクト維持） -->
                    <div class="w-full max-w-[360px] mx-auto mb-4">
                        <img
                                src={p.logo}
                                alt={p.name}
                                class="w-full h-auto object-contain"
                        />
                    </div>

                    <!-- 会社名 -->
                    <h3 class="text-lg font-medium text-[#0F3D47] mb-1">
                        {p.name} 様
                    </h3>

                    <!-- 役割 -->
                    <p class="text-xs text-[#1B2A3C]/70 mb-2">
                        {p.role}
                    </p>

                    <!-- 説明 -->
                    <p class="text-sm text-[#1B2A3C] leading-relaxed">
                        {p.description}
                    </p>

                </a>

            {/each}
        </div>

    </div>
</section>

<!-- =========================================================
     COLLABORATORS（コラボレーター）
========================================================= -->
<section class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto">

        <h2 class="text-2xl md:text-3xl font-light text-center mb-16" use:reveal>
            コラボレーター
        </h2>

        <!-- ★ 2 カラムに変更 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            {#each collaborators as c, i}
                <article
                        class="p-6 rounded-3xl bg-[#F7FAFC] shadow"
                        use:reveal={{ delay: i * 120 }}
                >

                    <!-- ★ 画像：最大サイズ・アスペクト維持・黒背景・object-contain -->
                    <div
                            class="w-full max-w-[480px] mx-auto aspect-[4/3] rounded-xl overflow-hidden bg-black mb-4"
                    >
                        <img
                                src={c.image}
                                class="w-full h-full object-contain"
                                alt={c.name}
                        />
                    </div>

                    <!-- 名前 -->
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

    </div>
</section>


<!-- =========================================================
     SUBSCRIPTION（サブスク）
========================================================= -->
<section class="py-44 bg-[#F7FAFC] px-6">
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-light text-center mb-24" use:reveal>
            Personal Plan
        </h2>

        <div class="grid grid-cols-1 gap-12 max-w-xl mx-auto">
            {#each plans as p}
                <div class="relative rounded-3xl bg-white border border-black/5 px-10 py-12 shadow-lg" use:reveal>
                    {#if p.popular}
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0F3D47] text-white text-xs px-4 py-1 rounded-full">
                            Recommended
                        </div>
                    {/if}

                    <h3 class="text-2xl font-light text-center mb-2">{p.name}</h3>
                    <p class="text-4xl text-[#0F3D47] text-center mb-4">{p.price}</p>
                    <p class="text-sm text-center text-[#1B2A3C] mb-10">{p.desc}</p>

                    <ul class="space-y-3 text-sm">
                        {#each p.features as f}
                            <li class="flex items-start gap-3 text-[#1B2A3C]">
                                <span class="text-emerald-600 mt-[2px]">●</span>
                                {f}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- =========================================================
     PETS（関連ソリューション）
========================================================= -->
<!-- PETS（関連ソリューション） -->
<section class="py-32 px-6 bg-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
            <span class="text-xs uppercase tracking-widest text-[#0F3D47]/70 block mb-3">
                Related Product
            </span>
            <h2 class="text-2xl md:text-3xl font-light text-[#0A1A2F] mb-6">
                {pets.title}
            </h2>

            <p class="text-lg text-[#1B2A3C] whitespace-pre-line leading-relaxed">
                {pets.body}
            </p>
        </div>

        <div class="relative overflow-hidden rounded-2xl">
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1}
                    class="w-full">
                {#each pets.images as img}
                    <SwiperSlide><img src={img} class="w-full object-cover"/></SwiperSlide>
                {/each}
            </Swiper>
        </div>

    </div>
</section>

<!-- =========================================================
     CTA（導入相談）
========================================================= -->
<section class="py-40 bg-[#0F3D47] text-center px-6 text-white">
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
</section>
