<script>
    import Router, { link } from "svelte-spa-router";
    import { addMessages, init, getLocaleFromNavigator, locale } from "svelte-i18n";
    import { clientLang } from "./stores/App.js";

    import { routes } from "./routes.js";

    // Localization JSONs
    import en from "./locales/en.json";
    import tr from "./locales/tr.json";
    import { map } from "./stores/Map.js";
    import MapboxLanguage from "@mapbox/mapbox-gl-language";

    // Import locales
    addMessages("en", en);
    addMessages("tr", tr);

    // Since client lang gets set after preload info request, we have to set it in $:
    // TODO: maybe better solution for this?
    $: {
        console.log("Loaded info from API", $clientLang)
        init({
            fallbackLocale: "en",
            initialLocale: $clientLang
        });

        // Set map language
        /*if ($locale) {
            const supportedMapLanguages = ["en", "fr", "de", "it", "jp", "kr", "pt", "ru", "es", "vt"];
            if (supportedMapLanguages.includes($locale)) {
                const language = new MapboxLanguage();
                console.log("Changing map language to", $locale);
                language.setLanguage("mapbox://styles/mapbox/outdoors-v11", $locale ? $locale : "en");
                $map.addControl(language);
            };
        };*/
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/yesvelte@next/css/tabler.min.css" />
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<main>
    <Router {routes}/>
</main>