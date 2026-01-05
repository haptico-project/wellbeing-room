<script>
  import "../../app.css";
  import {page} from "$app/stores";
  import ContactService from "../../domains/contactService";

  $: currentPath = $page.url?.pathname ?? "";

  const mailToLink = ContactService.createMailToLink();

  // ダミーのフッターナビゲーションデータ
  const footerNav = [
    {
      title: "サービス",
      links: [
        {label: "Wellbeing room について", href: "#about"},
        {label: "導入事例", href: "#cases"}
      ]
    },
    {
      title: "企業情報",
      links: [
        {label: "運営会社", href: "https://facetherapie.com/"},
      ]
    },
    {
      title: "サポート",
      links: [
        {label: "お問い合わせ", href: mailToLink},
        // {label: "特定商取引法の表示", href: "#"},　TODO
        // {label: "プライバシーポリシー", href: "#"}, TODO
        // {label: "利用規約", href: "#"}, TODO
      ]
    },
  ];
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Noto+Serif+JP:wght@300;400;500&display=swap"
            rel="stylesheet"
    >
</svelte:head>

<main class="min-h-screen flex flex-col">
    <slot/>
</main>

<footer class="bg-[#F7FAFC] text-[#1B2A3C] border-t border-black/5">
    <div class="max-w-6xl mx-auto px-6 py-16">

        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-black/10 pb-12">

            <div class="col-span-2 md:col-span-1 md:order-last md:ml-auto">
                <p class="text-xl font-medium text-[#0F3D47] mb-4">Haptic wellbeing room</p>
                <address class="not-italic text-sm text-[#1B2A3C]/80 space-y-1">
                    <p>運営会社: 株式会社ファセテラピー</p>
                </address>
            </div>

            {#each footerNav as section}
                <div>
                    <h4 class="font-medium text-sm text-[#0F3D47] mb-4 border-b border-[#0F3D47]/30 pb-1">
                        {section.title}
                    </h4>
                    <ul class="space-y-2 text-sm text-[#1B2A3C]/80">
                        {#each section.links as link}
                            <li>
                                <a href={link.href} class="hover:text-[#0F3D47] transition">
                                    {link.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}

        </div>

        <div class="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#1B2A3C]/70 space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Haptic wellbeing room</p>

<!--            <div class="flex space-x-4">-->
<!--                <a href="#" class="hover:text-[#0F3D47] transition">Twitter</a>-->
<!--                <a href="#" class="hover:text-[#0F3D47] transition">Instagram</a>-->
<!--                <a href="#" class="hover:text-[#0F3D47] transition">Facebook</a>-->
<!--            </div>-->
        </div>

    </div>
</footer>

<style>
</style>