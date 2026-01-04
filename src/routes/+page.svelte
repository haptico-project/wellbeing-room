<script lang="ts">
  import {base} from '$app/paths';
  import HeroSection from '../components/HeroSection.svelte';
  import AboutSection from '../components/AboutSection.svelte';
  import PackageSection from '../components/PackageSection.svelte';
  import OptionsSection from '../components/OptionsSection.svelte';
  import ScenesSection from '../components/ScenesSection.svelte';
  import CaseStudiesSection from '../components/CaseStudiesSection.svelte';
  import TechnologySection from '../components/TechnologySection.svelte';
  import PartnersSection from '../components/PartnersSection.svelte';
  import CollaboratorsSection from '../components/CollaboratorsSection.svelte';
  import SubscriptionSection from '../components/SubscriptionSection.svelte';
  import PetsSection from '../components/PetsSection.svelte';
  import CtaSection from '../components/CtaSection.svelte';

  // Swiperのスタイルは親で定義
  import 'swiper/css';
  import 'swiper/css/pagination';

  /* =========================================================
     image resolver
  ========================================================= */
  const resolveImg = (src: string) => {
    if (!src) return '';

    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    if (src.startsWith('/http://') || src.startsWith('/https://')) {
      return src.slice(1);
    }

    return `${base}${src.startsWith('/') ? src : `/${src}`}`;
  };

  /* =========================================================
     DATA (元のファイルから全てコピー)
  ========================================================= */

  // HERO
  const hero = {
    image: resolveImg(
      '/sections/hero/top.png'
    ),
    kicker: '',
    title: 'Haptic \n wellbeing room',
    subtitle:
      'ただ、いるだけで整う\n自然の響きに満たされた空間',
    cta: [
      {label: 'Wellbeing Room とは', primary: true, href: '#about'},
      {label: '導入事例を見る', primary: false, href: '#cases'}
    ]
  };

  // Wellbeing Roomとは（説明＋YouTube）
  const about = {
    title: 'Wellbeing Room とは',
    body: `Wellbeing Room は、短時間で深く整う空間です。

森の中で深呼吸するような、静かで深い休息を日常空間にそのまま持ち込むことを目指しています。
施工工事は不要で、電源さえあればすぐに導入できます。`,
    youtubeId: 'CxbP5grgW5E'
  };

  // パッケージ構成
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
    }
  ];

  // オプション一覧
  const options = [
    {
      title: 'Wellbeing フェイス',
      body: '「Wellbeing フェイス」は、\n' +
        '\n' +
        '熟練マッサージ技術者の手によるマッサージ技術を DX 化（デジタル技術化）したもので、森や海の自然音から精製した低周波成分を用いたサウンド スキンケア デバイスです。 「Wellbeing フェイス」とその関連技術は国際的な評価を獲得しており、2017 年 京都大学総長賞（学際研究アイデアコンテスト）、2023 年 Health 2.0 Dubai Outstanding Leadership Award を受賞。',
      image: resolveImg('/sections/options/face.png')
    },
    {
      title: 'Wellbeing ヘッド',
      body: '「Wellbeing フェイス」は、\n' +
        '\n' +'は、デジタル疲労が溜まりやすい額や目の周りを重点的にケアすることで、優れた治療効果を実現します。自然音から抽出した振動で心地よい刺激を与え、頭痛や緊張を和らげます。また、長時間のパソコン作業で目が疲れた方には、目元専用のケアプログラムで眼精疲労の回復をサポートします。',
      image: resolveImg('https://placehold.co/600x400?text=Bodycare')
    }
  ];

  // 関連ソリューション：ペット向け
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

  // 活用シーン
  const scenes = [
    {title: 'オフィス', body: '短時間でリフレッシュできる休憩スペースとして。'},
    {title: 'ショールーム', body: '来訪者の体験価値を高める空間演出に。'},
    {title: 'ホテル', body: '滞在の質を高めるウェルビーイング体験として。'},
    {title: '医療・ケア施設', body: '不安軽減や休息のサポートに。'},
    {title: 'ペット施設', body: '動物のストレスケアに（関連製品）。'}
  ];

  // 導入事例
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

  // 技術紹介
  const technologies = [
    {
      title: "顔リズム",
      body: "「顔リズム」は、熟練マッサージ技術者の手によるマッサージ技術を DX 化（デジタル技術化）したもので、森や海の自然低周波音から精製した低周波成分を用いた顔型振動マッサージデバイスです。\n「顔リズム」とその関連技術は国際的な評価を獲得しており、2017 年 京都大学総長賞（学際研究アイデアコンテスト）、2023 年 Health 2.0 Dubai Outstanding Leadership Award を受賞。私たちの革新的な治療振動技術へのアプローチが世界的に認められています。",
      image: resolveImg("/sections/techs/kaorhythm.png")
    },
    {
      title: "Dr.AI - HARU",
      body: "多様なライフスタイルで「顔リズム」を使いたいとのご要望にお応えして、私たちは軽量でコンパクトな「Dr.AI - HARU」を開発しました。\nHARU 専用の顔リズム用アタッチメントにより、軽量・コンパクトな「顔リズム」をご利用いただけます。",
      image: resolveImg("/sections/techs/draiharu.png")
    },
    {
      title: "ポータブル - HARU",
      body: "ポータブル - HARU は、デジタル疲労が溜まりやすい額や目の周りを重点的にケアすることで、優れた治療効果を実現します。自然音から抽出した振動で心地よい刺激を与え、頭痛や緊張を和らげます。また、長時間のパソコン作業で目が疲れた方には、目元専用のケアプログラムで眼精疲労の回復をサポートします。",
      image: resolveImg("/sections/techs/portableharu.png")
    },
    {
      title: "HARU - Haptic Adaptive Resonance Unit",
      body: "HARU（触覚適応共鳴ユニット）は、あなた専用のパーソナルセラピストとして、一人ひとりのニーズに合わせたオーダーメイドの癒し体験をお届けします。フェイシャルアタッチメントと組み合わせることで、顔リズム体験に変身。眼精疲労や頭痛の緩和には、アタッチメントを交換するだけで対応できます。\nさらに、大切なペット専用のアタッチメントを通じて、愛するパートナーにも癒しの効果をもたらします。",
      image: resolveImg("/sections/techs/haru.png")
    },
    {
      title: "TerraSonic — 地球の低周波調和と音響技術が融合した新しい立体音響",
      body: "Tactile DX Lab.（鈴木ら）の自然低周波音に関する先駆的研究により、低周波音響が三次元空間共鳴を生み出すという革新的発見がもたらされました。この画期的な成果は、まったく新しい空間音響技術へと発展し、日本を代表する音楽会社のオーディオ制作に採用され、数多くのライブコンサートやアートパフォーマンスで活用されています。また、著名な映画監督やアーティストとのコラボレーションも生み出しています。\nTerraSonic のイノベーションは止まりません。\n私たちのウェルネスルームで、最先端の TerraSonic 技術をご体験ください。",
      image: resolveImg("/sections/techs/terrasonic.png")
    }
  ];

  // パートナー企業
  const partners = [
    {
      name: "加賀電子株式会社",
      role: "",
      url: "https://www.taxan.co.jp/",
      description:
        "加賀電子株式会社は、1968 年の創業以来、半世紀を超える歴史を持つ日本を代表する独立系エレクトロニクス商社で、東京証券取引所プライム市場に上場しています。事業領域は、電子部品・半導体の販売から EMS（電子機器の受託開発・製造サービス）、パソコンおよび周辺機器などの完成品販売まで幅広く展開しています。",
      logo: resolveImg("/sections/partners/kaga.png")
    },
    {
      name: "加賀スポーツ株式会社",
      role: "",
      url: "https://www.kagasports.co.jp/",
      description:
        "加賀スポーツ株式会社は 2004 年に設立され、2007 年に現社名へ変更されました。加賀電子株式会社の 100% 出資子会社として、スポーツ用品の販売、ゴルフ用品を中心とした小売店舗の運営、スポーツ施設の企画・管理、関連イベントの企画など、スポーツおよび健康分野に関する事業を幅広く展開しています。東京都千代田区に本社を置き、「ゴルフプラザ アクティブ」などのブランドで店舗展開を行うほか、ゴルフ練習場、バッティングセンター、ボディケア施設などの複合運営も実施。健康機器・フィットネス用品の卸売事業も展開し、法人・個人を問わず幅広い顧客に対応しています。加賀電子グループ内では流通・小売部門を担い、グループのリソースを活かしながらスポーツと健康領域を多角的に推進しています。",
      logo: resolveImg("/sections/partners/kagasports.png")
    },
    {
      name: "London Trusted Therapy Inc.",
      role: "",
      url: "https://londontrustedtherapy.com/",
      description:
        "London Trusted Therapy Harley Street は、個人、企業、地域社会を対象に心の健康とウェルビーイングを支援する英国屈指の専門機関です。創設者であるオレーナ・エドワーズ＝スカドフスカ医師のもと、国際的に活躍するセラピスト、精神科医、研究者が集い、倫理と地域重視のケアを理念として活動しています。専門教育と臨床研究への継続的な投資を行い、鈴木泰博教授の研究チームとの共同研究を通じて、革新的な振動触覚デバイスの臨床試験を実施。不安の軽減、気分の落ち込みの改善、PTSD 症状の緩和、睡眠の質の向上などの効果が期待されており、日本の最先端技術と英国の臨床専門性が結びついた画期的な取り組みとして注目されています。あらゆる年齢層の人々がより健やかに、より豊かに生きられるよう支援を続けています。",
      logo: resolveImg("/sections/partners/ltt.png")
    },
    {
      name: "LaVita 株式会社",
      role: "",
      url: "https://lavita-pet.com/",
      description:
        "LaVita（ラヴィータ）株式会社は 2003 年に設立され、中国・四国および関東地方に 7 店舗を展開するペット専門小売企業です。「ペットと家族がともに健やかに過ごせる空間づくり」を理念とし、ペットと家族の理想的なマッチング支援や、新たにペットを迎える家庭への総合的なサポートを提供しています。2024 年には池袋のヨドバシ HD ビル内に東京最大規模の駅直結型屋内ドッグパークを開業。空調完備・特殊床材採用の快適な環境が評価され、日本で唯一の駅直結型屋内犬向けレクリエーション施設として注目を集めています。",
      logo: resolveImg("/sections/partners/lavita.png")
    },
    {
      name: "Golf Studio f（ゴルフパフォーマンスエクセレンス研究所）",
      role: "",
      url: "https://golfstudiof.jp/",
      description:
        "Golf Studio f（スポーツコンディショニングラボ – ゴルフパフォーマンスエクセレンス研究所）は、1995 年にプロライセンスを取得したプロゴルファー石渡俊彦氏によって設立されました。トップレベルのゴルフ専門知識とスポーツ医学の革新性を融合させた拠点として、徒手療法とスポーツ医学を専門とするフィジカルトレーナーとしての知識と経験を活かし、選手の育成やコンディショニングを支援しています。2004 年には「レッスン・オブ・ザ・イヤー」を受賞し、若手育成からアマチュア指導まで幅広く評価されています。多数の書籍や DVD を出版し、多くのゴルファーから信頼を集めています。",
      logo: resolveImg("/sections/partners/golfstudiof.png")
    },
    {
      name: "宙の音株式会社",
      role: "",
      url: "https://soranone-inc.com/",
      description:
        "宙の音株式会社は、作曲家・コーニッシュの音楽が持つ可能性を多方面へ展開・発展させるために設立された音楽企画・制作会社です。アニメや映画などの映像音楽にとどまらず、シリアスミュージック、アートと音楽を融合させた企画「音観」、幼児期の感性教育を支える「宙の音メソッド」など、ジャンルや世代を超えて音楽の力を社会に還元する取り組みを行っています。世界と未来にひらかれた音楽の受け皿として、2016 年に設立されました。",
      logo: resolveImg("/sections/partners/soranone.png")
    }
  ];

  // コラボレーター
  const collaborators = [
    {
      name: "Conisch（コーニッシュ）",
      role: "作曲家 / サウンドクリエイター",
      affiliation: "",
      body: "Conisch（コーニッシュ）は、作曲・ピアノを中心に、企画、プロデュース、指揮まで幅広く手がける音楽家です。豊かな感情表現と、抒情的でありながらもアグレッシブでキャッチーなメロディーを特徴とし、登場人物の心情に寄り添う音楽は高く評価されています。これまで数多くの人気番組の音楽を担当し、独自の感性と卓越した技術によって生み出される作品は、唯一無二の存在感を放っています。2023 年には世界的大人気ゲーム『ポケットモンスター』のテレビアニメ新シリーズの音楽担当に抜擢。TBS 系列『ひるおび!』のメインテーマ曲も手がけ、番組開始（2009 年）以来 16 年目となる現在も日本のお茶の間で親しまれています。また、TBS『情報 7days ニュースキャスター』のテーマ曲は現在も根強い人気を誇ります。2025 年には NHK 広島局『お好みワイド』のテーマ曲を木管楽器を中心とした編成で書き下ろし、NHK 交響楽団の奏者によって演奏されました。さらに、アイズナー賞ノミネート作品『Let's Play』のアニメ化にあたり音楽担当として起用されるなど、国際的な活動も広がっています。吹奏楽作品にも精力的に取り組み、『吹奏楽のための交響譚 〜 饂飩讃頌（Udon Anthem）〜』や『Yúkucia』など挑戦的な作品を発表。クラリネット協奏曲『流響のロワール』の世界初演では NHK 交響楽団首席クラリネット奏者・松本健司氏を迎え、好評を博しました。『音観 SEE THE SOUND』プロジェクトでは武藤順九氏や原田忠氏とのコラボレーションを実現し、『アートアクアリウム美術館 GINZA』の全エリア音楽をプロデュース。その他、国交 150 周年記念式典での演奏、資生堂のヘアショー音楽制作、東京大学生産技術研究所への楽曲寄贈、大阪教育大学ウインドオーケストラの委嘱作品の指揮、映画『Raced Silk』でのベートーヴェン「月光」演奏、合唱曲「友よ」の制作、ヤマハリゾート「葛城北の丸」の音楽制作、幼児教育音楽プロジェクト『宙の音メソッド』の開発など、多彩な領域で活動を展開しています。",
      image: resolveImg("/sections/collaborators/conisch.png")
    },
    {
      name: "Éric Maestri",
      role: "作曲家 / 音楽学者",
      affiliation: "ソルボンヌ大学 音楽学研究所 IReMus 准教授",
      body: "Éric Maestri は、ソルボンヌ大学 音楽学研究所 IReMus の准教授（Maître de conférences）であり、作曲家・音楽学者として国際的に活躍しています。彼の作品は、世界三大芸術祭のひとつであるヴェネツィア・ビエンナーレ（2011・2013 年）や、フランス国立音響音楽研究所 IRCAM 主催のアゴラ音楽祭（2010–11 年）など、現代音楽の最前線を担う音楽祭で繰り返し演奏されてきました。また、アムステルダムのムジークヘバウ、ベルリン・コンツェルトハウス、東京オペラシティ（2016 年）といった世界有数のコンサートホールでも上演され、RAI（イタリア）、Radio France（フランス）、NPO（オランダ）などの公共放送でも紹介されています。2008 年には若手作曲家の登竜門として知られるオランダ・ガウデアムス賞にノミネートされ、国際的に注目される存在となりました。さらに、世界中からわずか数名のみが選ばれる難関プログラムである IRCAM の作曲家養成プログラム（2009–10 年）を修了し、アカデミー・アカント（2007–08 年）やダルムシュタット国際夏期講習会（2010 年）など、権威あるマスタークラスにも厳しい選抜を経て参加しています。音楽学者としては、電子音響やミクスト・メディア音楽の分析・美学・歴史研究を専門とし、JSPS–CNRS サマープログラムの奨学生として名古屋大学でも研究を行いました。教育者としても経験豊富で、ストラスブール大学、パリ第 8 大学、ロレーヌ大学、ジェノヴァ国立音楽院などで教鞭をとり、国際的な視点から音楽教育と研究に貢献しています。",
      image: resolveImg("/sections/collaborators/eric_maestri.png")
    }
  ];

  // サブスク
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
    /* Swiperが必要なコンポーネントのために、共通スタイルをここで定義 */
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

<HeroSection
        image={hero.image}
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        cta={hero.cta}
/>

<AboutSection
        id="about"
        title={about.title}
        body={about.body}
        youtubeId={about.youtubeId}
        bgColorClass="bg-white"
/>

<PackageSection
        packageItems={packageItems}
        bgColorClass="bg-[#F7FAFC]"
/>

<OptionsSection
        options={options}
        bgColorClass="bg-white"
/>

<ScenesSection
        scenes={scenes}
        bgColorClass="bg-[#F7FAFC]"
/>

<CaseStudiesSection
        id="cases"
        caseStudies={caseStudies}
        bgColorClass="bg-white"
/>

<TechnologySection
        technologies={technologies}
        bgColorClass="bg-[#F7FAFC]"
        paddingClass="py-24"
/>

<PartnersSection
        partners={partners}
        bgColorClass="bg-white"
/>

<CollaboratorsSection
        collaborators={collaborators}
        bgColorClass="bg-white"
/>


<SubscriptionSection
        plans={plans}
        bgColorClass="bg-[#F7FAFC]"
        paddingClass="py-44"
/>

<PetsSection
        pets={pets}
        bgColorClass="bg-white"
/>

<CtaSection/>