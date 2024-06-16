<script>
    import "../styles/app.css"

    import { fade } from 'svelte/transition';
    import { El } from 'yesvelte';
    import { SvelteToast } from '@zerodevx/svelte-toast';

    import config from "../config";

    import Preload from "./Preload.svelte";
    import Navbar from "./Navbar.svelte";
    import Map from './Map/Map.svelte';
    import MapActions from "./Map/MapActions.svelte";
    import Footer from "./Footer.svelte";

    import Utils from "../lib/Utils.js";

    import { version, state, clientIp } from "../stores/App";

    let isLoaded = false;
    let preloadDone = false;

    async function preload() {
        // Skip preload if we're in dev environment

        return new Promise((resolve, reject) => {
            fetch(`${config.API_FQDN}/status/v1/info`, {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(async data => {
                // Load data from the response and set to stores.
                $version = data.version;
                $state = data.state;
                $clientIp = data.ip;

                // Wait 1.5 seconds to give it a loading feeling.
                await new Promise(resolve => setTimeout(resolve, 1500));

                isLoaded = true;
                setTimeout(() => preloadDone = true, 500);
                resolve(data);
            })
            .catch(error => {
                reject(new Error(`Something went wrong! WorldNote can't be loaded.`));
            });
        });
    };

    preload(); // Start preloading immediately
</script>

<El container>
    <!-- Load with preload on top -->
    {#if !preloadDone}
        <div class="preload-container" transition:fade="{{ duration: 500 }}" style="z-index: 99999999 !important;">
            <Preload/>
        </div>
    {/if}

    <!-- Once preload is loaded, fade into the content -->
    {#if isLoaded}
        <div transition:fade="{{ duration: 500 }}">
            <El row>
                <Navbar/>
            </El>
            <El row>
                <Map/>
                <MapActions/>
                <SvelteToast />
            </El>

            <El row>
                <Footer/>
            </El>
        </div>
    {/if}
</El>
