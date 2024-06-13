<script>
    import "./app.css";

    import { El } from 'yesvelte';

    import Navbar from "./components/Navbar.svelte";
    import Map from './components/Map.svelte';
    import MapActions from "./components/MapActions.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/yesvelte@next/css/tabler.min.css" />
</svelte:head>

<main>
    <El container>
        <El row>
            <Navbar/>
        </El>
        <El row>
            <Map/>
            <MapActions/>
        </El>
    </El>
</main>
