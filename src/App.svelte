<script>
    import Router, { link } from "svelte-spa-router";
    import { addMessages, init, getLocaleFromNavigator, locale } from "svelte-i18n";
    import MapboxLanguage from "@mapbox/mapbox-gl-language";
    import Device from 'svelte-device-info';

    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang') || null;

    import { routes } from "./routes.js";

    // Stores
    import { clientLang } from "./stores/App.js";
    import { map } from "./stores/Map.js";

    import en from "./locales/en.json";
    import tr from "./locales/tr.json";
    import es from "./locales/es.json";
    import ru from "./locales/ru.json";
    import it from "./locales/it.json";
    import zh from "./locales/zh.json";
    import ja from "./locales/ja.json";
    import ko from "./locales/ko.json";
    import pt from "./locales/pt.json";
    import fr from "./locales/fr.json";

    // Import locales
    addMessages("en", en);
    addMessages("tr", tr);
    addMessages("es", es);
    addMessages("ru", ru);
    addMessages("it", it);
    addMessages("zh", zh);
    addMessages("ja", ja);
    addMessages("ko", ko);
    addMessages("pt", pt);
    addMessages("fr", fr);

    // Inform the client if they're on mobile that worldnote might not be stable
    if (Device.isMobile) {
        alert(`WorldNote is in a beta state and it's not stable on mobile. For better experience, try WorldNote on Desktop.`);
    };

    // Since client lang gets set after preload info request, we have to set it in $:
    // TODO: maybe better solution for this?
    $: {
        console.log("Loaded info from API", $clientLang)
        init({
            fallbackLocale: "en",
            initialLocale: queryLang || $clientLang
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