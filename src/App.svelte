<script>
    import Router, { link } from "svelte-spa-router";
    import { routes } from "./routes.js";
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/yesvelte@next/css/tabler.min.css" />
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<main>
    <Router {routes}/>
</main>