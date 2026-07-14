<script>
  import "../app.css";
  import {page} from "$app/stores";
  import ContactService from "../domains/contactService";

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
        {label: "特定商取引法の表示", href: "/tokusho"},
        {label: "プライバシーポリシー", href: "/privacy"},
        {label: "利用規約", href: "/terms"},
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

            <div class="flex items-center space-x-5">
                <a href="https://www.instagram.com/facetherapie" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="hover:text-[#0F3D47] transition">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@tftkabonj6g" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="hover:text-[#0F3D47] transition">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
            </div>
        </div>

    </div>
</footer>

<style>
</style>
