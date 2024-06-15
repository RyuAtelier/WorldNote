<script>
    import "../styles/preload.css";
    import { El, Spinner } from 'yesvelte';

    import { version, state } from "../stores/App";

    const preloadTexts = [
        "Leave a memory on Earth.",
        "Pin your story to the world map.",
        "Share your moment with the globe.",
        "Drop a note, leave your mark.",
        "Make your presence felt across the continents.",
        "Plant your memory in the global garden.",
        "Let your voice echo across borders.",
        "Connect your story to the world's canvas.",
        "Imprint your legacy on the map of memories.",
        "Leave your digital footprint on Earth.",
        "Chart your adventures for the world to explore."
    ];
    let preloadMessage = getRandomPreloadText();

	// Returns a random message
    function getRandomPreloadText() {
        return preloadTexts[Math.floor(Math.random() * preloadTexts.length)];
    };
</script>

<El container class="container">
    <El row>
        <El col class="preload-logo">🌎 WorldNote</El>
    </El>
    <El row>
        <El col class="preload-version">{$state} {$version}</El>
    </El>
    <El row>
        <El col class="preload-message">{preloadMessage}</El>
    </El>
    <El row>
        <El col>
            <Spinner color="primary" class="spinner"/>
        </El>
    </El>
</El>
