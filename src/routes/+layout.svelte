<script>
    import "../app.css";
    import {page} from "$app/stores";

    $: currentPath = $page.url?.pathname ?? "";
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

<!-- FOOTER -->
<footer class="py-14 bg-[#F7FAFC] text-center text-xs md:text-sm text-[#1B2A3C]/70">
    © {new Date().getFullYear()} Wellbeing Room
</footer>

<style>
</style>