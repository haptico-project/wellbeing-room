<script lang="ts">

    import {Swiper, SwiperSlide} from 'swiper/svelte';
    import 'swiper/css';
    import 'swiper/css/pagination';
    // @ts-ignore
    import {Pagination} from 'swiper';

    /* =========================================================
       Scroll Reveal
    ========================================================= */
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

    /* =========================================================
       HERO
    ========================================================= */
    const hero = {
        image:
            "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1500,w_2000,f_auto,q_auto/3301372/726187_716584.jpeg",
        kicker: "Sound, Touch, and Quiet Wellbeing",
        title: "ただ、いるだけで整う。\nWellbeing Room",
        subtitle:
            "自然音の立体音響と触覚振動を組み合わせた、次世代型のウェルビーイング空間。短時間でも深い休息と意識の切り替えを実現します。",
        cta: [
            {label: "Wellbeing Room とは", primary: true, href: "#about"},
            {label: "導入事例を見る", primary: false, href: "#cases"}
        ]
    };

    /* =========================================================
       Wellbeing Roomとは（説明＋YouTube）
    ========================================================= */
    const about = {
        title: "Wellbeing Room とは",
        body: `Wellbeing Room は、自然音に含まれる低周波成分を抽出し、
それを立体音響と触覚振動として再構成する独自技術から生まれた空間です。

森の中で深呼吸するような、静かで深い休息を日常空間にそのまま持ち込むことを目指しています。
施工工事は不要で、電源さえあればすぐに導入できます。`,
        youtubeId: "CxbP5grgW5E"
    };

    /* =========================================================
       パッケージ構成（元サイトの “必要なものがすべて揃ったパッケージ”）
    ========================================================= */
    const packageItems = [
        {
            title: "設置は簡単",
            body: "Wellbeing room は、自然音を響かせる立体音響システムとマッサージベッドを含む、必要なものがすべて揃ったオールインワンパッケージ。\n" +
                "大掛かりな工事は不要、通常の電源さえあればちょっとした空間にすぐ設置可能です。小さな空間が、自然の森に包まれるような癒しの体験空間へと変わります。",
            image: "/sections/packages/setup.png"
        },
        {
            title: "設置例",
            body: "立体音響\n" +
                "＋\n" +
                "コラーゲンマスク\n" +
                "＋\n" +
                "ボディケア（Dr.AI)。",
            image: "/sections/packages/image.gif"
        },
        {
            title: "選べるオプション",
            body: "Wellbeing room では、自然音を立体音響システムで体感するだけでなく、音響マッサージを組み合わせて体験することも可能です。\n" +
                "立体音響による空間全体の没入感に加え、美容フェイシャルケアとしてのコラーゲンマスク、ボディケアとしての Dr. AI haru を選択でき、目的や状態に合わせたリラックスを実現します。",
            image: "/sections/packages/options.png"
        }
    ];

    /* =========================================================
       オプション一覧
    ========================================================= */
    const options = [
        {
            title: "フェイシャルケア（コラーゲンマスク）",
            body: "美容ケアとしてのフェイシャルオプション。",
            image: "https://placehold.co/600x400?text=Facial"
        },
        {
            title: "ボディケア（Dr.AI）",
            body: "自然音の低周波を利用したボディケアデバイス。",
            image: "https://placehold.co/600x400?text=Bodycare"
        }
    ];

    /* =========================================================
       関連ソリューション：ペット向け
    ========================================================= */
    const pets = {
        title: "関連ソリューション：Wellbeing Room for Animals",
        body: `大切なパートナーたちにも自然の“整える力”を。
人のリラクゼーションや回復に用いられてきたWellbeing Roomの仕組みを動物のために最適化したのが「Wellbeing Room for Animals」です。

主な活用シーン

・ご自宅での健康サポートに
　　– 日常空間で簡単に使えるウェルネスケア。
・高齢パートナーのケアや回復期に
　　– 血流や神経を落ち着かせ、生活の質をサポート。
・長距離移動の不安軽減に
　　– 移動中のストレスを和らげ、睡眠もサポート。
・動物病院での術前・術後に
　　– 緊張や鳴き声、呼吸の乱れを抑える補助として。`,
        images: [
            "/sections/pets/img1.png",
            "/sections/pets/img2.png",
            "/sections/pets/img3.png"
        ]
    };

    /* =========================================================
       活用シーン
    ========================================================= */
    const scenes = [
        {title: "オフィス", body: "短時間でリフレッシュできる休憩スペースとして。"},
        {title: "ショールーム", body: "来訪者の体験価値を高める空間演出に。"},
        {title: "ホテル", body: "滞在の質を高めるウェルビーイング体験として。"},
        {title: "医療・ケア施設", body: "不安軽減や休息のサポートに。"},
        {title: "ペット施設", body: "動物のストレスケアに（関連製品）。"}
    ];

    /* =========================================================
       導入事例（カルーセル対応）
    ========================================================= */
    const caseStudies = [
        {
            title: "加賀電子株式会社 様",
            body: "本社内ジムの一角に Wellbeing Room を導入いただきました。美容・健康志向の高い従業員の満足度向上に貢献させていただいております。働く人のコンディションケアに活用されています。本社エントランスには立体音響 (TerraSonic) を導入いただきました。森の自然音＋自然低周波による立体音響がエントランスに重厚な高級感をもたらしています。",
            images: [
                "/sections/cases/kaga/wbr1.png",
                "/sections/cases/kaga/wbr2.png",
                "/sections/cases/kaga/wbr3.png",
                "/sections/cases/kaga/wbr4.png",
                "/sections/cases/kaga/3dSound.png",
            ]
        },
        {
            title: "レクサス川口店, Golf Studio f 様",
            body: "店舗内のゴルフサロン・フィットネスで美容を加えた新しいサービスが人気を集めています。レッスンの前後で心身を整える用途に活用されています。",
            images: [
                "/sections/cases/lexus/fit1.png",
                "/sections/cases/lexus/fit2.png",
            ]
        },
        {
            title: "ボルボ・カー 千葉みなと店, Golf Studio f 様",
            body: "レクサス川口店様と同様に、フィットネス＋美容のサービスが上質な顧客体験の一環として機能しています。",
            images: [
                "/sections/cases/volvo/fit1.png",
            ]
        }
    ];

    /* =========================================================
       技術紹介
    ========================================================= */
    const technology = {
        title: "Tactile DX Lab. の技術",
        body: `Tactile DX Lab.は、世界に先駆けて触覚デジタルトランスフォーメーション（触覚DX）技術を開発・展開している研究集団です。
名古屋大学の鈴木泰博を中心に、世界トップクラスの研究者、エンジニア、専門技術者、デザイナーなどが集い、専門分野や組織の枠を超えて協働しています。
「森の部屋」に導入された技術は、こうした多様な知と技術の結晶として生まれました。
Wellbeing Room で使用されている技術をご紹介しましょう。`,
        image: "https://placehold.co/800x500?text=Technology"
    };
    const technologies = [
        {
            title: "顔リズム",
            body: "「顔リズム」は、熟練マッサージ技術者の手によるマッサージ技術を DX 化（デジタル技術化）したもので、森や海の自然低周波音から精製した低周波成分を用いた顔型振動マッサージデバイスです。\n「顔リズム」とその関連技術は国際的な評価を獲得しており、2017 年 京都大学総長賞（学際研究アイデアコンテスト）、2023 年 Health 2.0 Dubai Outstanding Leadership Award を受賞。私たちの革新的な治療振動技術へのアプローチが世界的に認められています。",
            image: "/sections/techs/kaorhythm.png"
        },
        {
            title: "Dr.AI - HARU",
            body: "多様なライフスタイルで「顔リズム」を使いたいとのご要望にお応えして、私たちは軽量でコンパクトな「Dr.AI - HARU」を開発しました。\nHARU 専用の顔リズム用アタッチメントにより、軽量・コンパクトな「顔リズム」をご利用いただけます。",
            image: "/sections/techs/draiharu.png"
        },
        {
            title: "ポータブル - HARU",
            body: "ポータブル - HARU は、デジタル疲労が溜まりやすい額や目の周りを重点的にケアすることで、優れた治療効果を実現します。自然音から抽出した振動で心地よい刺激を与え、頭痛や緊張を和らげます。また、長時間のパソコン作業で目が疲れた方には、目元専用のケアプログラムで眼精疲労の回復をサポートします。",
            image: "/sections/techs/portableharu.png"
        },
        {
            title: "HARU - Haptic Adaptive Resonance Unit",
            body: "HARU（触覚適応共鳴ユニット）は、あなた専用のパーソナルセラピストとして、一人ひとりのニーズに合わせたオーダーメイドの癒し体験をお届けします。フェイシャルアタッチメントと組み合わせることで、顔リズム体験に変身。眼精疲労や頭痛の緩和には、アタッチメントを交換するだけで対応できます。\nさらに、大切なペット専用のアタッチメントを通じて、愛するパートナーにも癒しの効果をもたらします。",
            image: "/sections/techs/haru.png"
        },
        {
            title: "TerraSonic — 地球の低周波調和と音響技術が融合した新しい立体音響",
            body: "Tactile DX Lab.（鈴木ら）の自然低周波音に関する先駆的研究により、低周波音響が三次元空間共鳴を生み出すという革新的発見がもたらされました。この画期的な成果は、まったく新しい空間音響技術へと発展し、日本を代表する音楽会社のオーディオ制作に採用され、数多くのライブコンサートやアートパフォーマンスで活用されています。また、著名な映画監督やアーティストとのコラボレーションも生み出しています。\nTerraSonic のイノベーションは止まりません。\n私たちのウェルネスルームで、最先端の TerraSonic 技術をご体験ください。",
            image: "/sections/techs/terrasonic.png"
        }
    ];


    /* =========================================================
       パートナー企業
    ========================================================= */
    const partners = [
        {
            name: "加賀電子株式会社",
            role: "",
            url: "https://www.taxan.co.jp/",
            description:
                "加賀電子株式会社は、1968 年の創業以来、半世紀を超える歴史を持つ日本を代表する独立系エレクトロニクス商社で、東京証券取引所プライム市場に上場しています。事業領域は、電子部品・半導体の販売から EMS（電子機器の受託開発・製造サービス）、パソコンおよび周辺機器などの完成品販売まで幅広く展開しています。",
            logo: "/sections/partners/kaga.png"
        },
        {
            name: "加賀スポーツ株式会社",
            role: "",
            url: "https://www.kagasports.co.jp/",
            description:
                "加賀スポーツ株式会社は 2004 年に設立され、2007 年に現社名へ変更されました。加賀電子株式会社の 100% 出資子会社として、スポーツ用品の販売、ゴルフ用品を中心とした小売店舗の運営、スポーツ施設の企画・管理、関連イベントの企画など、スポーツおよび健康分野に関する事業を幅広く展開しています。東京都千代田区に本社を置き、「ゴルフプラザ アクティブ」などのブランドで店舗展開を行うほか、ゴルフ練習場、バッティングセンター、ボディケア施設などの複合運営も実施。健康機器・フィットネス用品の卸売事業も展開し、法人・個人を問わず幅広い顧客に対応しています。加賀電子グループ内では流通・小売部門を担い、グループのリソースを活かしながらスポーツと健康領域を多角的に推進しています。",
            logo: "/sections/partners/kagasports.png"
        },
        {
            name: "London Trusted Therapy Inc.",
            role: "",
            url: "https://londontrustedtherapy.com/",
            description:
                "London Trusted Therapy Harley Street は、個人、企業、地域社会を対象に心の健康とウェルビーイングを支援する英国屈指の専門機関です。創設者であるオレーナ・エドワーズ＝スカドフスカ医師のもと、国際的に活躍するセラピスト、精神科医、研究者が集い、倫理と地域重視のケアを理念として活動しています。専門教育と臨床研究への継続的な投資を行い、鈴木泰博教授の研究チームとの共同研究を通じて、革新的な振動触覚デバイスの臨床試験を実施。不安の軽減、気分の落ち込みの改善、PTSD 症状の緩和、睡眠の質の向上などの効果が期待されており、日本の最先端技術と英国の臨床専門性が結びついた画期的な取り組みとして注目されています。あらゆる年齢層の人々がより健やかに、より豊かに生きられるよう支援を続けています。",
            logo: "/sections/partners/ltt.png"
        },
        {
            name: "LaVita 株式会社",
            role: "",
            url: "https://lavita-pet.com/",
            description:
                "LaVita（ラヴィータ）株式会社は 2003 年に設立され、中国・四国および関東地方に 7 店舗を展開するペット専門小売企業です。「ペットと家族がともに健やかに過ごせる空間づくり」を理念とし、ペットと家族の理想的なマッチング支援や、新たにペットを迎える家庭への総合的なサポートを提供しています。2024 年には池袋のヨドバシ HD ビル内に東京最大規模の駅直結型屋内ドッグパークを開業。空調完備・特殊床材採用の快適な環境が評価され、日本で唯一の駅直結型屋内犬向けレクリエーション施設として注目を集めています。",
            logo: "/sections/partners/lavita.png"
        },
        {
            name: "Golf Studio f（ゴルフパフォーマンスエクセレンス研究所）",
            role: "",
            url: "https://golfstudiof.jp/",
            description:
                "Golf Studio f（スポーツコンディショニングラボ – ゴルフパフォーマンスエクセレンス研究所）は、1995 年にプロライセンスを取得したプロゴルファー石渡俊彦氏によって設立されました。トップレベルのゴルフ専門知識とスポーツ医学の革新性を融合させた拠点として、徒手療法とスポーツ医学を専門とするフィジカルトレーナーとしての知識と経験を活かし、選手の育成やコンディショニングを支援しています。2004 年には「レッスン・オブ・ザ・イヤー」を受賞し、若手育成からアマチュア指導まで幅広く評価されています。多数の書籍や DVD を出版し、多くのゴルファーから信頼を集めています。",
            logo: "/sections/partners/golfstudiof.png"
        },
        {
            name: "宙の音株式会社",
            role: "",
            url: "https://soranone-inc.com/",
            description:
                "宙の音株式会社は、作曲家・コーニッシュの音楽が持つ可能性を多方面へ展開・発展させるために設立された音楽企画・制作会社です。アニメや映画などの映像音楽にとどまらず、シリアスミュージック、アートと音楽を融合させた企画「音観」、幼児期の感性教育を支える「宙の音メソッド」など、ジャンルや世代を超えて音楽の力を社会に還元する取り組みを行っています。世界と未来にひらかれた音楽の受け皿として、2016 年に設立されました。",
            logo: "/sections/partners/soranone.png"
        }
    ];


    /* =========================================================
       コラボレーター
    ========================================================= */
    const collaborators = [
        {
            name: "Conisch（コーニッシュ）",
            role: "作曲家 / サウンドクリエイター",
            affiliation: "",
            body: "Conisch（コーニッシュ）は、作曲・ピアノを中心に、企画、プロデュース、指揮まで幅広く手がける音楽家です。豊かな感情表現と、抒情的でありながらもアグレッシブでキャッチーなメロディーを特徴とし、登場人物の心情に寄り添う音楽は高く評価されています。これまで数多くの人気番組の音楽を担当し、独自の感性と卓越した技術によって生み出される作品は、唯一無二の存在感を放っています。2023 年には世界的大人気ゲーム『ポケットモンスター』のテレビアニメ新シリーズの音楽担当に抜擢。TBS 系列『ひるおび!』のメインテーマ曲も手がけ、番組開始（2009 年）以来 16 年目となる現在も日本のお茶の間で親しまれています。また、TBS『情報 7days ニュースキャスター』のテーマ曲は現在も根強い人気を誇ります。2025 年には NHK 広島局『お好みワイド』のテーマ曲を木管楽器を中心とした編成で書き下ろし、NHK 交響楽団の奏者によって演奏されました。さらに、アイズナー賞ノミネート作品『Let's Play』のアニメ化にあたり音楽担当として起用されるなど、国際的な活動も広がっています。吹奏楽作品にも精力的に取り組み、『吹奏楽のための交響譚 〜 饂飩讃頌（Udon Anthem）〜』や『Yúkucia』など挑戦的な作品を発表。クラリネット協奏曲『流響のロワール』の世界初演では NHK 交響楽団首席クラリネット奏者・松本健司氏を迎え、好評を博しました。『音観 SEE THE SOUND』プロジェクトでは武藤順九氏や原田忠氏とのコラボレーションを実現し、『アートアクアリウム美術館 GINZA』の全エリア音楽をプロデュース。その他、国交 150 周年記念式典での演奏、資生堂のヘアショー音楽制作、東京大学生産技術研究所への楽曲寄贈、大阪教育大学ウインドオーケストラの委嘱作品の指揮、映画『Raced Silk』でのベートーヴェン「月光」演奏、合唱曲「友よ」の制作、ヤマハリゾート「葛城北の丸」の音楽制作、幼児教育音楽プロジェクト『宙の音メソッド』の開発など、多彩な領域で活動を展開しています。",
            image: "/sections/collaborators/conisch.png"
        },
        {
            name: "Éric Maestri",
            role: "作曲家 / 音楽学者",
            affiliation: "ソルボンヌ大学 音楽学研究所 IReMus 准教授",
            body: "Éric Maestri は、ソルボンヌ大学 音楽学研究所 IReMus の准教授（Maître de conférences）であり、作曲家・音楽学者として国際的に活躍しています。彼の作品は、世界三大芸術祭のひとつであるヴェネツィア・ビエンナーレ（2011・2013 年）や、フランス国立音響音楽研究所 IRCAM 主催のアゴラ音楽祭（2010–11 年）など、現代音楽の最前線を担う音楽祭で繰り返し演奏されてきました。また、アムステルダムのムジークヘバウ、ベルリン・コンツェルトハウス、東京オペラシティ（2016 年）といった世界有数のコンサートホールでも上演され、RAI（イタリア）、Radio France（フランス）、NPO（オランダ）などの公共放送でも紹介されています。2008 年には若手作曲家の登竜門として知られるオランダ・ガウデアムス賞にノミネートされ、国際的に注目される存在となりました。さらに、世界中からわずか数名のみが選ばれる難関プログラムである IRCAM の作曲家養成プログラム（2009–10 年）を修了し、アカデミー・アカント（2007–08 年）やダルムシュタット国際夏期講習会（2010 年）など、権威あるマスタークラスにも厳しい選抜を経て参加しています。音楽学者としては、電子音響やミクスト・メディア音楽の分析・美学・歴史研究を専門とし、JSPS–CNRS サマープログラムの奨学生として名古屋大学でも研究を行いました。教育者としても経験豊富で、ストラスブール大学、パリ第 8 大学、ロレーヌ大学、ジェノヴァ国立音楽院などで教鞭をとり、国際的な視点から音楽教育と研究に貢献しています。",
            image: "/sections/collaborators/eric_maestri.png"
        }
    ];

    /* =========================================================
       サブスクプラン（個人向け）
    ========================================================= */
    const plans = [
        {
            name: "Personal",
            price: "¥5,500 / month",
            desc: "個人向け Wellbeing Room の月額プランです。振動デバイスのレンタル付きです。※初期手数料 22,000 円が初月のみ請求に加算されます。",
            features: [
                "Wellbeing Room",
            ],
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
